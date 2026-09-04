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
    return (
      <div className="mx-auto max-w-lg rounded-full border border-amber-400/20 bg-amber-400/4 px-5 py-2 text-center">
        <p className="text-[8px] tracking-[0.12em] text-amber-300">
          {message.content}
        </p>
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
        className={`max-w-[78%] rounded-2xl px-5 py-4 md:max-w-[65%] ${
          isUser
            ? "rounded-br-sm border border-cyan-400/20 bg-cyan-400/8"
            : "rounded-tl-sm border border-slate-700 bg-[#080808]"
        }`}
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`text-[7px] tracking-[0.15em] ${
              isUser
                ? "text-cyan-400"
                : "text-emerald-400"
            }`}
          >
            {isUser ? "YOU" : "ZENITH"}
          </span>
        </div>

        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-200">
          {message.content}
        </p>

        {message.timestamp && (
          <p
            className={`mt-3 text-[7px] ${
              isUser
                ? "text-cyan-400/45"
                : "text-slate-600"
            }`}
          >
            {message.timestamp}
          </p>
        )}
      </div>
    </div>
  );
}