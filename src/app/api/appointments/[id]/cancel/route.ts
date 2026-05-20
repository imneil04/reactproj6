import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

//strong type field
interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH (
  req: Request,
  { params }: RouteParams
) {
  try {
    const supabase = await createClient(); //ssr

    const {
      data: { user },
    } = await supabase.auth.getUser(); //auth user

    //check if user exists
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const { data, error } = await supabase
      .from("appointments")
      .update({
        status: "cancelled",
      })
      .eq("id", id)
      .eq("user_id", user.id) //ensure parents can ONLY cancel own appointments
      .select()
      .single();

      //throw custom error msg if something is wrong
    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    //ERROR HANDLERS - effective for debugging app code or program issues
    //if all is good, show success message
    return NextResponse.json({
      message:
        "Appointment cancelled successfully",
      appointment: data,
    });

  } catch (error) {
    console.error(
      "Cancel appointment error:",
      error
    );

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}