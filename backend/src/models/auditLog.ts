import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    task: {
      type: String,
      required: true,
    },
    detectedTypes: [String],
    policyActions: [String],
    blocked: Boolean,
    safe: Boolean,
  },
  {
    versionKey: false,
  }
);

export const AuditLogModel = mongoose.model("AuditLog", auditLogSchema);