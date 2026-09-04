import { useEffect, useRef, useState } from "react";
import type { ChatMessage, DetectedItem } from "../../types";
import { initialMessages } from "../../data/mockChat";
import { processFirewallRequest } from "../../services/firewallApi";
import ChatMessageItem from "./ChatMessage";
import DispatchButton from "./DispatchButton";

interface ChatWindowProps {
  processing: boolean;
  output: string;
  detectedItems: DetectedItem[];
  onProcessingStart: () => void;
  onProcessingComplete: (
    items: DetectedItem[],
    output: string
  ) => void;
}

const processingSteps = [
  "ANALYSING REQUEST CONTEXT",
  "SCANNING INPUT FOR SENSITIVE DATA",
  "EVALUATING DATA NECESSITY",
  "APPLYING PRIVACY POLICY",
  "TRANSFORMING EXPOSED INFORMATION",
  "SECURING FINAL OUTPUT",
];

export default function ChatWindow({
  onProcessingStart,
  onProcessingComplete,
}: ChatWindowProps) {
  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, visibleSteps, loading]);

  useEffect(() => {
    if (!loading) return;

    let currentStep = 0;

    const interval = window.setInterval(() => {
      currentStep += 1;

      setVisibleSteps(
        Math.min(currentStep, processingSteps.length)
      );

      if (currentStep >= processingSteps.length) {
        window.clearInterval(interval);
      }
    }, 700);

    return () => window.clearInterval(interval);
  }, [loading]);

  const handleDispatch = async () => {
    const trimmed = input.trim();

    if (!trimmed || loading) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setVisibleSteps(0);
    setLoading(true);

    onProcessingStart();

    try {
      const result = await processFirewallRequest(trimmed);

      await new Promise((resolve) =>
        window.setTimeout(resolve, 4200)
      );

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.sanitizedData,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      onProcessingComplete(
        result.detectedItems,
        result.sanitizedData
      );
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            "PROCESSING FAILURE // CONNECTION RETRY REQUIRED",
        },
      ]);
    } finally {
      setLoading(false);
      setVisibleSteps(0);
    }
  };

  return (
    <div className="relative z-10 flex h-[calc(100vh-7rem)] w-full flex-col overflow-hidden border border-slate-800 bg-black">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 md:px-7">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.65)]" />

          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-200">
              ZENITH SECURED SESSION
            </p>

            <p className="mt-1 text-[7px] tracking-[0.14em] text-emerald-400">
              PRIVACY FIREWALL // ACTIVE
            </p>
          </div>
        </div>

        <span className="text-[8px] tracking-[0.14em] text-slate-600">
          SECURE CHANNEL
        </span>
      </div>

      <div className="chat-scroll flex-1 overflow-y-auto px-4 py-6 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
            />
          ))}

          {loading && (
            <div className="mt-3 w-full max-w-xl self-start rounded-2xl rounded-tl-sm border border-cyan-400/15 bg-cyan-400/[0.035] px-5 py-5">
              <div className="mb-5 flex items-center gap-3">
                <span className="processing-dot h-2 w-2 rounded-full bg-cyan-400" />

                <p className="text-[9px] tracking-[0.16em] text-cyan-300">
                  ZENITH PROCESSING
                </p>
              </div>

              <div className="space-y-3">
                {processingSteps
                  .slice(0, visibleSteps)
                  .map((step, index) => (
                    <div
                      key={step}
                      className="processing-step flex items-center gap-3"
                      style={{
                        animationDelay: `${index * 0.04}s`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />

                      <span className="text-[8px] tracking-[0.12em] text-slate-400">
                        {step}
                      </span>

                      <span className="ml-auto text-[7px] text-emerald-400/70">
                        COMPLETE
                      </span>
                    </div>
                  ))}
              </div>

              <div className="mt-5 h-px w-full bg-slate-800">
                <div className="processing-bar h-px bg-cyan-400/80" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-800 bg-black px-4 py-4 md:px-8 md:py-5">
        <div className="mx-auto flex w-full max-w-6xl items-end gap-3">
          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                handleDispatch();
              }
            }}
            placeholder="Enter data or request..."
            className="min-h-13 max-h-32 flex-1 resize-none rounded-2xl border border-slate-800 bg-[#050505] px-5 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/35"
          />

          <DispatchButton
            loading={loading}
            disabled={!input.trim()}
            onClick={handleDispatch}
          />
        </div>
      </div>
    </div>
  );
}