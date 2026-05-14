import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
//import { createClient } from "@/utils/supabase/client";

//attendance strong type for update
/*type AttendanceUpdate = {
  status?: string;

  check_in_time?: string | null;

  check_out_time?: string | null;

  checked_in_by?: string | null;

  checked_out_by?: string | null;

};  */

export async function POST(req: NextRequest) {

   try {

    //console.log("Attendance route hit");

    const supabase = await createClient(); // via SSR

    //console.log("Supabase client created");

    const body = await req.json();

    //console.log("Request body:", body);

    const {
      childId,
      status,
    } = body;

    let updateData: any = {
      status,
    };
    /** let updateData: AttendanceUpdate {
     *  status,
     * }
    */

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("Authenticated user:", user);

    if (userError) {
      console.log("User fetch error:", userError);
    }

    if (!user) {

      console.log("Unauthorized request");

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Attendance states
    if (status === "Checked In") {

      updateData.check_in_time =
        new Date().toISOString();

      updateData.check_out_time = null;

      updateData.checked_in_by = user.id;
    }

    else if (status === "Checked Out") {

      updateData.check_out_time =
        new Date().toISOString();

      updateData.checked_out_by = user.id;
    }

    // Non-attendance states
    else if (
      status === "Absent" ||
      status === "Sick" ||
      status === "On Vacation"
    ) {

      updateData.check_in_time = null;

      updateData.check_out_time = null;

      updateData.checked_in_by = null;

      updateData.checked_out_by = null;
    }

    //console.log("Update payload:", updateData);

    const { data, error } = await supabase
      .from("attendance")
      .update(updateData)
      .eq("child_id", childId)
      .select()
      .single();

    //console.log("Supabase response data:", data);

    if (error) {

      //console.log("Supabase update error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );

    }

    return NextResponse.json(data);

  }

  catch (err) {

    console.log("SERVER CRASH:");
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }

}