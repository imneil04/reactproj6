"use client";
import { useEffect, useState } from "react";

interface AttendanceRecord {
  id: string;

  status: string;

  check_in_time: string | null;

  check_out_time: string | null;

  children: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

//format time display in UI
function formatTimestamp(timestamp: string | null) {

  if (!timestamp) return "-";

  return new Date(timestamp).toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",

    hour: "numeric",
    minute: "2-digit",

    hour12: true,
  });
}

//format status label colors (helper function)
function getStatusStyles(status: string) {

  switch (status) {

    case "Checked In":
      return "bg-green-100 text-green-700";

    case "Checked Out":
      return "bg-slate-200 text-slate-700";

    case "Absent":
      return "bg-amber-100 text-amber-700";

    case "Sick":
      return "bg-cyan-100 text-cyan-700";

    case "On Vacation":
      return "bg-teal-100 text-teal-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}


export default function ChildAttendance() {

    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    
    const [loading, setLoading] = useState(true);


    async function fetchAttendance() {
      try {
        const res = await fetch("/api/attendance");

        const data = await res.json();

        console.log(data);

        //setAttendance(data.data);
        setAttendance(Array.isArray(data) ? data : []);

      } catch (error) {

        console.error(error);

        setAttendance([]);

      } finally {

        setLoading(false);
      }
    }

    useEffect(() => {
        fetchAttendance();
    }, []);

    //function for check-in feature
    /*async function handleCheckIn(childId: string) {
    await fetch("/api/attendance/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        childId,
      }),
    });

      await fetchAttendance();
    }

    //function for check-out feature
  async function handleCheckOut(childId: string) {
    await fetch("/api/attendance/check-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        childId,
      }),
    });

    await fetchAttendance();
  } */

  //function attendance stat check
  async function updateAttendanceStatus(
    childId: string,
    status: string
  ) {

    //route to access 
    await fetch("/api/attendance/update-status", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      //return as json object
      body: JSON.stringify({
        childId,
        status,
      }),
    });

    await fetchAttendance();
  }

    //for better UI display 
   /*if (loading) {
    return <p className="text-center py-10">Loading attendance...</p>;
  }*/

  return (
    <>

        <section className="max-w-6xl mx-auto px-4 py-10">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                Child Attendance
                </h1>
                <p className="text-slate-500 mt-2">
                Daily classroom attendance monitoring.
                </p>
            </div>

            <div className="overflow-y-auto rounded-2xl 
                            border border-slate-200 shadow-sm bg-gray-100 p-3">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {attendance.map((record) => (

                      <div
                        key={record.id}
                        className="bg-white rounded-2xl shadow-sm 
                        border border-slate-200 p-5 
                        flex flex-col gap-4"
                      >

                        <div className="flex items-start justify-between">

                          <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                              {record.children.first_name}{" "}
                              {record.children.last_name}
                            </h2>

                            <p className="text-sm text-slate-500">
                              Check In: {formatTimestamp(record.check_in_time)}
                            </p>

                            <p className="text-sm text-slate-500">
                              Check Out: {formatTimestamp(record.check_out_time)}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium 
                              
                              ${getStatusStyles(record.status)}
                            `}
                          >
                            {record.status}
                          </span>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                          <button
                            onClick={() => updateAttendanceStatus(record.children.id, "Checked In")}

                            disabled={record.status === "Checked In"}

                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition text-white cursor-pointer ${
                              record.status === "Checked In"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            Check In
                          </button>

                          <button
                            onClick={() => updateAttendanceStatus(record.children.id, "Checked Out")}

                            disabled={record.status === "Checked Out"}

                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition text-white cursor-pointer ${
                              record.status === "Checked Out"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            Check Out
                          </button>

                          <button
                            onClick={() => updateAttendanceStatus(record.children.id, "Absent")}

                            //disabled={record.status === "Absent"}

                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition text-white cursor-pointer ${
                              record.status === "Absent"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-amber-600 hover:bg-amber-700"
                            }`}
                          >
                            Absent
                          </button>

                          <button
                            onClick={() => updateAttendanceStatus(record.children.id, "Sick")}

                            //disabled={record.status === "Absent"}

                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition text-white cursor-pointer ${
                              record.status === "Sick"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-cyan-600 hover:bg-cyan-700"
                            }`}
                          >
                            Sick
                          </button>

                          <button
                            onClick={() => updateAttendanceStatus(record.children.id, "On Vacation")}

                            //disabled={record.status === "Absent"}

                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition text-white cursor-pointer ${
                              record.status === "On Vacation"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700"
                            }`}
                          >
                            On Vacation
                          </button>

                        </div>

                      </div>

                    ))}

                </div>
            </div>
        </section>
    </>
  );
}