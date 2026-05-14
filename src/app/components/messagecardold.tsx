"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MessageCard({
  msg,
}: {
  msg: any;
}) {
  const [open, setOpen] = useState(false);
  const [replyOpen, setReplyOpen] =
    useState(false);

 //reply state msg card
 const [reply, setReply] = useState("");

 const handleReply = async () => {
  try {
    const response = await fetch(
      "/api/messages/reply",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          messageId: msg.id,
          reply,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to send reply"
      );

      return;
    }

    setReply("");

    // quick refresh
    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <>

        <div className="max-w-100 mx-auto">
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="
                        w-full
                        flex items-center justify-between
                        px-4 py-3
                        hover:bg-gray-50
                        transition
                        "
                    >
                        {/* Left */}
                        <div className="text-left min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium truncate">
                                {msg.subject || "No Subject"}
                                </h3>

                                <span
                                className={`
                                    text-[10px] px-2 py-0.5 rounded-full
                                    ${
                                    msg.status === "unread"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }
                                `}
                                >
                                {msg.status}
                                </span>
                            </div>

                            <p className="text-xs text-gray-500 truncate">
                                To: {msg.staff?.full_name}
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3 ml-4">
                            <p className="text-xs text-gray-400 whitespace-nowrap">
                                {new Date(
                                msg.created_at
                                ).toLocaleDateString()}
                            </p>

                        <ChevronDown
                            size={18}
                            className={`
                            transition-transform duration-300
                            ${open ? "rotate-180" : ""}
                            `}
                        />
                        </div>
                    </button>

                    {/* Expandable Content */}
                    <div
                        className={`
                        overflow-hidden transition-all duration-300
                        ${
                            open
                            ? "max-h-[400px]"
                            : "max-h-0"
                        }
                        `}
                    >
                        <div className="px-4 pb-4 border-t bg-gray-50">
                        {/* Message */}
                        <p className="pt-4 text-sm text-gray-700 whitespace-pre-line">
                            {msg.message}
                        </p>

                        {/* Actions */}
                        <div className="mt-4 flex justify-end">
                            <button
                            onClick={() =>
                                setReplyOpen(!replyOpen)
                            }
                            className="
                                text-sm font-medium
                                text-blue-600 hover:text-blue-700
                            "
                            >
                            {replyOpen
                                ? "Cancel"
                                : "Reply"}
                            </button>
                        </div>

                        {/* Reply Box */}
                        <div
                            className={`
                            overflow-hidden transition-all duration-300
                            ${
                                replyOpen
                                ? "max-h-[200px] mt-3"
                                : "max-h-0"
                            }
                            `}
                        >
                            <textarea
                                rows={3}
                                value={reply}
                                onChange={(e) =>
                                    setReply(e.target.value)
                                }
                                placeholder="Write a reply..."
                                className="
                                    w-full border rounded-lg
                                    px-3 py-2 text-sm
                                    resize-none bg-white
                                "
                            />

                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={handleReply}
                                    className="
                                    bg-blue-600 hover:bg-blue-700
                                    text-white text-sm
                                    px-4 py-2 rounded-lg
                                    transition
                                    "
                                >
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </>
  );
}