import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

//API for updating
export async function PATCH(req: Request, { params }: RouteParams) {

    try {

        const supabase = await createClient();

        const body = await req.json();

        const { id } = await params; //dynamic route [id], retrieve dynamic value from URL

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
    }
    catch (err) {

    console.error("PATCH appointment error:", err);

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

