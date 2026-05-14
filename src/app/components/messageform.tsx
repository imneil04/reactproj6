"use client";
import { useState } from "react";

type Staff = {
  id: string;
  full_name: string;
};

//component feature messaging form, staff as prop passed to main parent dashboard page (ssr)
export default function MessageForm({
  staff,
}: {
  staff: Staff[];
}) {
  const [staffId, setStaffId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staffId,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      console.log("Message sent!");

      // clear form
      setStaffId("");
      setSubject("");
      setMessage("");

      // optional: close form after send
      setShowForm(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-cyan-600 hover:bg-cyan-700 hover:shadow-lg text-white px-6 py-3 rounded-xl transition-all duration-200 ease-in-out cursor-pointer"
      >
        {showForm ? "Close Message" : "New Message"}
      </button>

      {/* Animated Form */}
      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${
            showForm
              ? "max-h-[800px] opacity-100 mt-6"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Send a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Staff Dropdown */}
            <div>
              <label className="block mb-2 font-medium">
                To
              </label>

              <select
                value={staffId}
                onChange={(e) =>
                  setStaffId(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Staff
                </option>

                {staff.map((member) => (
                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Enter subject"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows={6}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Type your message..."
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="cursor-pointer bg-cyan-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}