
//import { useEffect } from 'react';
//import { useRouter } from 'next/navigation';

//import { useAuth } from '@/providers/authprovider';
//import Attendance from "@/app/attendance/page";
//import { createClient } from "@/utils/supabase/server";
//import MessagesSection from '@/app/components/messagesection';
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import MessagesSection from "@/app/components/messagesection";
import Attendance from "@/app/attendance/page";
import AppointmentList from "@/ccomponents/staff/appointmentlist";

export default async function StaffDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // not logged in
  if (!user) {
    redirect("/login");
  }

  // fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // not staff
  if (profile?.role !== "staff") {
    redirect("/");
  }
  
  return (
    <div className="space-y-6 p-2">
        <h1 className="text-2xl font-bold flex flex-wrap justify-center mt-2">Welcome to your Dashboard</h1>
        <div className="mb-8 max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-slate-800">
                  Message Inbox:
                </h1>
                <p className="text-slate-500 mt-2">
                  Here you can check messages from parents inquiries, and check-ins.
                </p>
        </div>
        <MessagesSection role="staff" />
        
        <Attendance />

        <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                  Show Appointments
                </h1>
                <p className="text-slate-500 mt-2">
                  Here you view, check, and approve parent appointment requests.
                </p>
        </div>
        <AppointmentList />
    </div>
  );
}