"use client";
import { useEffect, useState } from "react";
import ParentAppointmentCard from "./parentappointmentcard";
import ParentAppointmentDetailsModal from "./parentappointmentmodal";

//strong type fields
export interface ParentAppointment {
  id: string;
  parent_name: string;
  child_name: string;
  child_age: string;
  appointment_date: string;
  appointment_time: string;
  location: string;
  subject: string;
  notes: string;
  status: string;
}

export default function ParentAppointmentList() {

  const [appointments, setAppointments] =
    useState<ParentAppointment[]>([]);

  const [selectedAppointment, setSelectedAppointment] =
    useState<ParentAppointment | null>(null);

  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "/api/appointments"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setAppointments(data);
    } catch (error) {
      console.error(
        "Parent appointments error:",
        error
      );

    } /*finally {
      //setLoading(false);
    }*/
  };

    const handleCancel = async (id: string) => {
        try {
            const response = await fetch(
            `/api/appointments/${id}/cancel`,
            {
                method: "PATCH",
            }
            );

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error);
            }

            setAppointments((prev) =>
            prev.map((appointment) =>
                appointment.id === id
                ? {
                    ...appointment,
                    status: "cancelled",
                    }
                : appointment
            )
            );
        } catch (error) {
            console.error(
            "Cancel appointment error:",
            error
            );
        }
    };

  /*if (loading) {
    return <p>Loading appointments...</p>;
  } */

  if (appointments.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <h2 className="text-xl font-semibold">
          No Appointments Yet
        </h2>

        <p className="mt-2 text-gray-500">
          Your booked appointments will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <>
        <div className="flex justify-center">
            <div
            className="overflow-x-auto max-w-2xl">
                <div className="flex gap-4 pb-4">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}className="min-w-[150px] max-w-[280px] flex-shrink-0">

                            <ParentAppointmentCard
                                    appointment={appointment}
                                    onView={() => setSelectedAppointment(appointment)}
                                    onCancel={handleCancel}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
       {/**custom message confirmation pop-up */}
      <ParentAppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={() =>
          setSelectedAppointment(null)
        }
      />
    </>
  );
}