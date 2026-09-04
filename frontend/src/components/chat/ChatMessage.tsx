import type { ChatMessage } from "../../types";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export default function ChatMessageItem({
  message,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    const isBlocked = message.content
      .toLowerCase()
      .includes("blocked");

    return (
      <div
        className={`mx-auto w-fit max-w-[90%] rounded-lg border px-4 py-2.5 text-center ${
          isBlocked
            ? "border-red-500/40 bg-red-500/[0.08]"
            : "border-amber-400/20 bg-amber-400/[0.04]"
        }`}
      >
        <div className="flex items-center justify-center gap-2.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isBlocked
                ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                : "bg-amber-400"
            }`}
          />

          <p
            className={`text-[9px] font-semibold tracking-[0.13em] ${
              isBlocked
                ? "text-red-400"
                : "text-amber-300"
            }`}
          >
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[68%] rounded-xl px-4 py-3 ${
          isUser
            ? "rounded-br-sm border border-slate-700 bg-black"
            : "rounded-tl-sm border border-slate-700 bg-black"
        }`}
      >
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-[8px] font-semibold tracking-[0.14em] text-slate-300">
            {isUser ? "ORGANIZATION" : "ZENITH"}
          </span>

          <span className="text-[7px] text-slate-700">
            //
          </span>

          <span className="text-[7px] tracking-[0.1em] text-slate-600">
            {isUser ? "REQUEST" : "SECURE RESPONSE"}
          </span>
        </div>

        <p className="whitespace-pre-wrap wrap-break-word text-[13px] leading-5 text-slate-200">
          {message.content}
        </p>

        {message.timestamp && (
          <p className="mt-2 text-[7px] tracking-[0.08em] text-slate-600">
            {message.timestamp}
          </p>
        )}
      </div>
    </div>
  );
}