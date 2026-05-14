import { NextResponse } from "next/server";
//import { supabase } from "@/lib/supabase";
//import { createClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

export async function GET() {

  //client
  //const supabase = createClient(); 

  //srvr
  const supabase = await createClient(); 
  
  //JOIN children table to fetch child name
  const { data, error } = await supabase
  
    .from("attendance")
    .select(`
      id,
      status,
      check_in_time,
      check_out_time,

      children (
        id,
        first_name,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
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