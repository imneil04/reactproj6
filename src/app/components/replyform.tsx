"use client";

import { useState } from "react";

export default function ReplyForm({
  messageId,
}: {
  messageId: string;
}) {
  const [reply, setReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReply = async () => {
    if (!reply.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/messages/reply",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messageId,
            reply,
          }),
        }
      );

      if (!response.ok) {
        return;
      }

      setReply("");

      window.location.reload();

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        rows={3}
        value={reply}
        onChange={(e) =>
          setReply(e.target.value)
        }
        placeholder="Write a reply..."
        className="w-full border rounded-xl px-4 py-3 resize-none text-sm bg-white"/>

      {/**button to reply */}
      <div className="flex justify-start mt-2">
        <button
          onClick={handleReply}
          disabled={loading}
          className="bg-cyan-600 cursor-pointer hover:bg-cyan-700 disabled:opacity-50 text-white text-sm px-5 py-2 rounded-xl transition-all duration-300 ease-out">
          {loading
            ? "Sending..."
            : "Reply"}
        </button>
      </div>
    </div>
  );
}