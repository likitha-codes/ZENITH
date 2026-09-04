import { Router } from "express";

import { detectSensitiveData } from "../services/detector";
import { analyzeTask } from "../services/taskAnalyzer";
import { checkNecessity } from "../services/necessityEngine";
import { decidePolicy } from "../services/policyEngine";
import { transformValue } from "../services/transformers";
import { askFeatherless } from "../services/featherless";
import { guardOutput } from "../services/outputGuard";
import { createAuditLog } from "../services/auditLogger";
import { AuditLogModel } from "../models/auditLog";

const router = Router();

router.post("/analyze", async (req, res) => {
  const { prompt } = req.body;

  const detectedEntities = detectSensitiveData(prompt);

  const taskAnalysis = await analyzeTask(prompt);

  const necessityResults = detectedEntities.map((entity) =>
    checkNecessity(entity.type, taskAnalysis.requiredData)
  );

  const policyDecisions = necessityResults.map((result) =>
    decidePolicy(result.entityType, result.necessary)
  );

  const blocked = policyDecisions.some(
    (decision) => decision.action === "BLOCK"
  );

  if (blocked) {
    const auditLog = createAuditLog(
      taskAnalysis.task,
      detectedEntities.map((entity) => entity.type),
      policyDecisions.map((decision) => decision.action),
      true,
      false
    );

    await AuditLogModel.create(auditLog);

    return res.status(403).json({
      error: "Request blocked by ZENITH privacy policy",
      policyDecisions,
    });
  }

  const transformedPrompt = policyDecisions.reduce(
    (currentPrompt, decision) => {
      const entity = detectedEntities.find(
        (item) => item.type === decision.entityType
      );

      if (!entity) {
        return currentPrompt;
      }

      const transformedValue = transformValue(
        entity.value,
        decision.action
      );

      return currentPrompt.replace(entity.value, transformedValue);
    },
    prompt
  );

  const aiResponse = await askFeatherless(transformedPrompt);

  const guardedResponse = guardOutput(aiResponse);

  const auditLog = createAuditLog(
    taskAnalysis.task,
    detectedEntities.map((entity) => entity.type),
    policyDecisions.map((decision) => decision.action),
    false,
    guardedResponse.safe
  );

  await AuditLogModel.create(auditLog);

  res.json({
    received: prompt,
    detectedEntities,
    taskAnalysis,
    necessityResults,
    policyDecisions,
    transformedPrompt,
    aiResponse: guardedResponse,
    auditLog,
  });
});

export default router;