"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MessageThread from "./messagethread";

export default function MessageCard({
  msg,
  currentUserId,
  role,
}: {
  msg: any;
  currentUserId?: string;
  role: "parent" | "staff";
}) {
  const [open, setOpen] =
    useState(false);

  //display name on msg thread base on role
  const displayName = role === "parent" ? msg.staff?.full_name : msg.parent?.full_name;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {/* Header */}
          <button
            onClick={async () => {
              const nextOpen = !open;

              setOpen(nextOpen);

              // mark as read
              if (
                nextOpen &&
                msg.status === "unread"
              ) {
                try {
                  await fetch(
                    "/api/messages/read",
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        messageId: msg.id,
                      }),
                    }
                  );

                  // optimistic UI update
                  msg.status = "read";

                } catch (error) {
                  console.error(error);
                }
              }
            }}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-medium truncate">
                  {msg.subject}
                </h2>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full${ msg.status === "unread" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700" }`}
                >
                  {msg.status}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                {/*msg.staff?.full_name*/}
                {displayName}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={` transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {/* Thread */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ${ open ? "max-h-[1000px]" : "max-h-0" }`}
          >
            <MessageThread
              msg={msg}
              currentUserId={currentUserId}
            />
          </div>
        </div>
        
      </div>
    </>
  );
}