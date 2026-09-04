import { useState } from "react";
import type { DetectedItem } from "../types";
import SystemHeader from "../components/layout/SystemHeader";
import SystemTelemetry from "../components/layout/SystemTelemetry";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState("");
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);

  const startProcessing = () => {
    setProcessing(true);
    setOutput("");
    setDetectedItems([]);
  };

  const completeProcessing = (
    items: DetectedItem[],
    processedOutput: string
  ) => {
    setDetectedItems(items);
    setOutput(processedOutput);
    setProcessing(false);
  };

  return (
    <main className="zenith-screen">
      <SystemHeader moduleIdentifier="MOD_CHT_06" />

      <section className="relative flex min-h-screen w-full px-5 pb-14 pt-20 md:px-8 md:pt-22">
        <ChatWindow
          processing={processing}
          output={output}
          detectedItems={detectedItems}
          onProcessingStart={startProcessing}
          onProcessingComplete={completeProcessing}
        />
      </section>

      <SystemTelemetry text="SECURE_SESSION // REALTIME_SCAN_ACTIVE" />
    </main>
  );
}