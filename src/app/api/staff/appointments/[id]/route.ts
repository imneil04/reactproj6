import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(req: Request, { params }: RouteParams) {
    
  try {
    const supabase = await createClient();

    const { id } = await params;

    const body = await req.json();

    const { status } = body;

    const { data, error } = await supabase
      .from("appointments")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

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

    return NextResponse.json({
      message: "Appointment updated",
      appointment: data,
    });
  } catch (error) {
    console.error(
      "PATCH appointment error:",
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