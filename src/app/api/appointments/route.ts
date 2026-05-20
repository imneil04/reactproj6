import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {

    try {

        const supabase = await createClient(); //ssr

        const body = await req.json();

        const {
            parent_name,
            parent_email,
            phone,
            child_name,
            child_age,
            location,
            subject,
            notes,
            appointment_date,
            appointment_time,
            } = body;

            //console.log("Incoming appointment:", body);

            //auth user
            const {

            data: { user },
            } = await supabase.auth.getUser();

            //if not user, throw error 401
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

            //insert appointment picks
            const { data, error } = await supabase
            .from("appointments")
            .insert({
                user_id: user.id,
                parent_name,
                parent_email,
                phone,
                child_name,
                child_age,
                location,
                subject,
                notes,
                appointment_date,
                appointment_time,
            })
            .select()
            .single();

            if (error) {
            console.error("Supabase insert error:", error);

                return NextResponse.json(
                    {
                    error: error.message,
                    },
                    {
                    status: 500,
                    }
                );
            }
        
            //if appointment is good, confirm data fetch
        return NextResponse.json(
            {
                message: "Appointment created successfully",
                appointment: data,
            },
            {
                status: 201,
            }
        );

    }
    catch(err) {
        console.error("API Error:", err);

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

export async function GET() {

    try {

        const supabase = await createClient();

        const {
        data: { user },
        } = await supabase.auth.getUser();

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

        const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false,
        });

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

        return NextResponse.json(data);
    }
    catch (err) {

        console.error("GET appointments error:", err);

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