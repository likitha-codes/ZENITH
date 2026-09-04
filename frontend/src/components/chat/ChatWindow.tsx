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
  detectedItems,
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
        content:
          result.aiResponse?.response ??
          result.sanitizedData,
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
        result.aiResponse?.response ??
          result.sanitizedData
      );
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            error instanceof Error &&
            error.message
              .toLowerCase()
              .includes("blocked")
              ? "REQUEST BLOCKED // PRIVACY POLICY"
              : "PROCESSING FAILURE // CONNECTION RETRY REQUIRED",
        },
      ]);
    } finally {
      setLoading(false);
      setVisibleSteps(0);
    }
  };

  return (
    <div className="relative z-10 flex h-[calc(100vh-7rem)] w-full flex-col overflow-hidden border-y border-slate-800 bg-black">

      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-6 py-3">

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white" />

          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-white">
              ORGANIZATIONAL AI GATEWAY
            </p>

            <p className="mt-0.5 text-[7px] tracking-[0.14em] text-slate-500">
              ZENITH PRIVACY FIREWALL // ACTIVE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-[7px] tracking-[0.13em] text-slate-600">
            SECURE CHANNEL
          </span>

          <span className="text-[7px] tracking-[0.13em] text-slate-400">
            ● PROTECTED
          </span>
        </div>
      </div>

      {/* CHAT */}
      <div className="chat-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5">

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">

          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
            />
          ))}

          {/* SECURITY SCAN */}
          {detectedItems.length > 0 && (
            <div className="mt-2 w-full max-w-3xl self-start rounded-lg border border-slate-800 bg-black px-4 py-3">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[8px] font-semibold tracking-[0.15em] text-slate-200">
                    ZENITH SECURITY SCAN
                  </p>

                  <p className="mt-1 text-[6px] tracking-[0.12em] text-slate-600">
                    SENSITIVE DATA DETECTED
                  </p>
                </div>

                <span className="text-[6px] tracking-[0.1em] text-amber-400">
                  {detectedItems.length} DETECTED
                </span>

              </div>

              <div className="mt-3 grid gap-1.5 sm:grid-cols-2">

                {detectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded border border-slate-800 px-3 py-1.5"
                  >
                    <span className="text-[7px] tracking-[0.1em] text-slate-400">
                      {item.label}
                    </span>

                    <span
                      className={`text-[7px] font-semibold tracking-[0.1em] ${
                        item.action === "BLOCK"
                          ? "text-red-400"
                          : item.action === "REMOVE"
                          ? "text-slate-300"
                          : "text-amber-300"
                      }`}
                    >
                      {item.action}
                    </span>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* PROCESSING */}
          {loading && (
            <div className="mx-auto mt-2 w-full max-w-3xl rounded-lg border border-slate-800 bg-black px-4 py-3">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-white" />

                <p className="text-[8px] tracking-[0.14em] text-slate-300">
                  ZENITH PROCESSING
                </p>

              </div>

              <div className="grid gap-2 sm:grid-cols-2">

                {processingSteps
                  .slice(0, visibleSteps)
                  .map((step) => (
                    <div
                      key={step}
                      className="processing-step flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-500" />

                      <span className="text-[7px] tracking-[0.1em] text-slate-500">
                        {step}
                      </span>

                      <span className="ml-auto text-[6px] text-slate-400">
                        OK
                      </span>
                    </div>
                  ))}

              </div>

              <div className="mt-3 h-px w-full bg-slate-900">
                <div className="processing-bar h-px bg-slate-400" />
              </div>

            </div>
          )}

          <div ref={chatEndRef} />

        </div>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-slate-800 bg-black px-6 py-2.5">

        <div className="mx-auto flex w-full max-w-6xl items-center gap-2">

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
            placeholder="Enter organizational request..."
            rows={1}
            className="h-10 flex-1 resize-none rounded-md border border-slate-800 bg-black px-3 py-2 text-[11px] text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-slate-500"
          />

          <DispatchButton
            loading={loading}
            disabled={!input.trim()}
            onClick={handleDispatch}
          />

        </div>

        <p className="mx-auto mt-1.5 max-w-6xl text-[6px] tracking-[0.1em] text-slate-700">
          ENTER TO DISPATCH • SHIFT + ENTER FOR NEW LINE
        </p>

      </div>

    </div>
  );
}