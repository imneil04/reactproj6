import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

//http handler 
//valid app router route handlers
// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
//read status API
  //API updates DB
  //status becomes read
  //badge or label updates in UI
export async function PATCH (
  req: Request
) {
  try {
    const body = await req.json();

    const { messageId } = body;

    const supabase =
      await createClient();

    const { error } = await supabase
      .from("parent_messages")
      .update({
        status: "read",
      })
      .eq("id", messageId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}