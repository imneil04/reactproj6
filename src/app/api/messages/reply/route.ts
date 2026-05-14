import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

//reply API route
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { messageId, reply } = body;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from("parent_message_replies")
      .insert({
        message_id: messageId,
        sender_id: user.id,
        reply,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // optional:
    // update parent message status
    await supabase
      .from("parent_messages")
      .update({
        status: "replied",
      })
      .eq("id", messageId);

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );

  } catch {
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}