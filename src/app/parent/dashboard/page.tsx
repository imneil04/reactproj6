//import { useEffect } from 'react';
//import { useRouter } from 'next/navigation';

//import { useAuth } from '@/providers/authprovider';
import MessageForm from '@/app/components/messageform';
import MessagesSection from '@/app/components/messagesection';
import { createClient } from '@/utils/supabase/server';

export default async function ParentDashboardPage () {

  const supabase = await createClient(); //ssr fetching

    //handler for staff info
    const { data: staff } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "staff");

    /*const {
    data: { user },
    } = await supabase.auth.getUser(); */

    return (
      <div className="space-y-6 p-2">
          {/**inbox component*/}
        <div className="mb-8 max-w-6xl mx-auto px-4 mt-5">
                <h1 className="text-3xl font-bold text-slate-800">
                  My Inbox:
                </h1>
                <p className="text-slate-500 mt-2">
                  Here you can check message history and responses from staff.
                </p>
        </div>
        <MessagesSection role="parent" />

        {/**pass staff component as props */}
        <MessageForm staff={staff || []} />

      </div>
    );
  }