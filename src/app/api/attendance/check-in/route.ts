import { NextRequest, NextResponse } from "next/server";
//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
//import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  
  try {
    
    //const supabase = await createClient();

    /*const {
    data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

      if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    } */

    const supabase = createClient(); //auth via ssr

    //const supabase = await createClient(); auth server-side

    const body = await req.json();

    const { childId } = body;

    if (!childId) {
      return NextResponse.json(
        {
          success: false,
          message: "Child ID is required",
        },
        { status: 400 }
      );
    }

    // //prevent double check-in, API re-use, stale frontend state
    const { data: existingAttendance } =
      await supabase
        .from("attendance")
        .select("status")
        .eq("child_id", childId)
        .single();

    if (existingAttendance?.status === "Checked In") {
      return NextResponse.json(
        {
          success: false,
          message: "Child is already checked in",
        },

        { status: 400 }
      );
    }

    //status dynamic, rows update, no dup rows
    const { data, error } = await supabase
      .from("attendance")
      .update({
        status: "Checked In",

        check_in_time: new Date().toISOString(),

        check_out_time: null,
      })
      .eq("child_id", childId)
      .select();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
    //return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}



