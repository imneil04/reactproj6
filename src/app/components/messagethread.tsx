"use client"; //client component
import { useEffect, useRef } from "react";
import ReplyForm from "./replyform";
import ReplyItem from "./replyitem";

export default function MessageThread({
  msg,
  currentUserId,
}: {
  msg: any;
  currentUserId?: string;
}) {

  const threadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop =
        threadRef.current.scrollHeight;
    }
  }, [msg.replies]);

  return (
    <div className="border-t bg-gray-50 p-4">
      {/* original msg header */}
      <div className="bg-white rounded-lg p-3 border">
        <p className="font-medium text-sm">
          Initial Message
        </p>

        <p className="mt-2 text-sm text-gray-700">
          {msg.message}
        </p>
      </div>

      {/* replies box */}
      <div className="mt-4 space-y-3 max-h-[150px] overflow-y-auto pr-2" ref={threadRef}>
        {msg.replies?.map(
          (reply: any) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              currentUserId={
                currentUserId
              }
            />
          )
        )}
      </div>

      {/* Reply Form */}
      <ReplyForm
        messageId={msg.id}
      />
    </div>
  );
}