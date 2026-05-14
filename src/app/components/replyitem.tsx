import { useEffect, useState } from "react";

export default function ReplyItem({
  reply,
  currentUserId,
}: {
  reply: any;
  currentUserId?: string;
}) {
   const [mounted, setMounted] =
    useState(false);

   useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isCurrentUser =
    reply.sender_id === currentUserId;

  return (
    <>
      <div
        className={`flex ${ isCurrentUser? "justify-end": "justify-start"}`}>
        <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${ isCurrentUser ? "bg-cyan-700 text-white": "bg-white border"}`}>
          <p className="font-medium text-xs opacity-70">
            {reply.sender?.full_name}
          </p>

          <p className="mt-1">
            {reply.reply}
          </p>
        </div>
      </div>
    </>
  );
}