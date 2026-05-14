import { createClient } from "@/utils/supabase/server";
import MessageCard from "./messagecard";

export default async function MessagesSection({
  role,
}: {
  role: "parent" | "staff";
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //query to DB
  let query = supabase
    .from("parent_messages")
    .select(`
      id,
      subject,
      message,
      status,
      created_at,

      parent:profiles!parent_id (
        full_name
      ),

      staff:profiles!staff_id (
        full_name
      ),

      replies:parent_message_replies (
        id,
        reply,
        created_at,
        sender_id,

        sender:profiles!sender_id (
          full_name
        )
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  // role filtering
  if (role === "parent") {
    query = query.eq(
      "parent_id",
      user?.id
    );
  }

  if (role === "staff") {
    query = query.eq(
      "staff_id",
      user?.id
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);

    return (
      <p>Failed to load messages.</p>
    );
  }

  const messages = data || [];

  return (
    <div className="space-y-3">
      {messages.map((msg: any) => (
        <MessageCard
          key={msg.id}
          msg={msg}
          currentUserId={user?.id}
          role={role}
        />
      ))}
    </div>
  );
}