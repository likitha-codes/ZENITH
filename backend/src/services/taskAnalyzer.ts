import { z } from "zod";
import { askFeatherless } from "./featherless";

const TaskAnalysisSchema = z.object({
  task: z.string(),
  requiredData: z.array(z.string()),
});

export type TaskAnalysis = z.infer<typeof TaskAnalysisSchema>;

export async function analyzeTask(prompt: string): Promise<TaskAnalysis> {
  const aiPrompt = `
You are the Task Understanding component of a privacy firewall.

Analyze the user's request and determine:
1. What task the user wants to perform.
2. What types of data are actually required to complete that task.

Return ONLY valid JSON in this exact format:
{
  "task": "short description of the task",
  "requiredData": ["data_type_1", "data_type_2"]
}

User request:
${prompt}
`;

  const response = await askFeatherless(aiPrompt);

  const cleanedResponse = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const parsedResponse = JSON.parse(cleanedResponse);

  return TaskAnalysisSchema.parse(parsedResponse);
}