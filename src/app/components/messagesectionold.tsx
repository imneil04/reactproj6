import { createClient } from "@/utils/supabase/server";
import MessageCard from "./messagecardold";

//strong type Message 
type Message = {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;

  /*staff: {
    full_name: string;
  } | null; */
   staff: any; //lose type for now

   replies: any[];

   sender: any;
};

export default async function MessagesSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /*const { data, error } = await supabase
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
    .eq("parent_id", user?.id)
    .order("created_at", {
      ascending: false,
    });  */

    const { data, error } = await supabase
    .from("parent_messages")
    .select(`
        id,
        subject,
        message,
        status,
        created_at,

        
        staff:profiles!staff_id (
        full_name
        ),

        replies:parent_message_replies (
        id,
        reply,
        created_at,

          sender:profiles!sender_id (
              full_name
          )
        )
    `)
    .eq("parent_id", user?.id)
    .order("created_at", {
        
        ascending: false,
    });

  if (error) {
    console.error(error);

    return (
      <p className="text-red-500">
        Failed to load messages.
      </p>
    );
  }

  const messages = (data || []) as Message[];

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">
          My Messages
        </h2>

        <p className="text-gray-500">
          No messages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        {messages.map((msg) => (
            <MessageCard 
                key={msg.id}
                msg={msg}

            />
        ))}
    </div>
  );
}