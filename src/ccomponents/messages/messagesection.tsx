import { createClient } from "@/utils/supabase/server";

export default async function MessagesSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: messages } = await supabase
    .from("parent_messages")
    .select(`
      id,
      subject,
      message,
      status,
      created_at,
      staff:profiles!staff_id (
        full_name
      )
    `)
    .eq("parent_id", user?.id);

  return (
    <div className="space-y-4">
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className="bg-white p-5 rounded-2xl shadow"
        >
          <h2 className="font-semibold">
            {msg.subject}
          </h2>

          <p className="text-sm text-gray-500">
            To: {msg.staff?.[0]?.full_name}
          </p>

          <p className="mt-3">
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
}