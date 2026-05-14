import { NextRequest, NextResponse } from "next/server";
//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client"; //client
//import { createClient } from "@/utils/supabase/server"; //server

export async function POST(req: NextRequest) {
  try {

    //const supabase = await createClient();

    /*const {
    data: { user },
    } = await supabase.auth.getUser();

      if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    } */
    
    const supabase = createClient(); //via ssr

    //const supabase = await createClient(); auth server-side

    const body = await req.json();

    const { childId } = body;

    if (!childId) {
      return NextResponse.json(
        {
          success: false,
          message: "Attendance ID is required",
        },
        { status: 400 }
      );
    }

    //prevent double check-outs, API re-use, stale frontend state
    const { data: existingAttendance } =
      await supabase
        .from("attendance")
        .select("status")
        .eq("child_id", childId)
        .single();

    if (existingAttendance?.status === "Checked Out") {

      return NextResponse.json(
        {
          success: false,
          message: "Child is already checked out",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("attendance")
      .update({
        status: "Checked Out",

        check_out_time: new Date().toISOString(),
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