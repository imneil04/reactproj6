"use client";

import { useEffect, useState } from "react";
import AppointmentCard from "./appointmentcard";
import AppointmentDetailsModal from "./appointmentdetailsmodal";

//strong type fields, easier to debug issues
//allows autocomplete for field if exists
//identifies what fields a component must contain
export interface Appointment {
  id: string;
  parent_name: string;
  parent_email: string;
  phone: string;
  child_name: string;
  child_age: string;
  appointment_date: string;
  appointment_time: string;
  location: string;
  notes: string;
  status: string;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/staff/appointments");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setAppointments(data);
    } catch (error) {

      console.error("Fetch appointments error:", error);

    } finally {

      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        `/api/staff/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status }
            : appointment
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  //console.log("Nothing", appointments);

  /*const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "pending"
  );

  const approvedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "approved"
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "completed"
  ); */

  return (
    <>
      <div className="bg-gray-100 flex justify-center">
        <div className="overflow-x-auto max-w-2xl">
          <div className="flex gap-4 pb-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="min-w-[150px] max-w-[280px] flex-shrink-0"
              >
                <AppointmentCard
                  appointment={appointment}
                  onView={() =>
                    setSelectedAppointment(
                      appointment
                    )
                  }
                  onStatusChange={
                    handleStatusChange
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={() =>
          setSelectedAppointment(null)
        }
      />
    </>
  );
}