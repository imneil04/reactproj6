import { Appointment } from "./appointmentlist";

interface AppointmentCardProps {
  appointment: Appointment;

  onView: () => void;

  onStatusChange: (
    id: string,
    status: string
  ) => void;
}

export default function AppointmentCard({
  appointment,
  onView,
  onStatusChange,
}: AppointmentCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg mt-3">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold">
            {appointment.parent_name}
          </h2>

          <p className="text-xs text-gray-500">
            {appointment.child_name}
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-medium ${
            appointment.status === "approved"
              ? "bg-green-100 text-green-700"
              : appointment.status === "cancelled"
              ? "bg-red-100 text-red-700 ml-3"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>{appointment.appointment_date}</p>

        <p>{appointment.appointment_time}</p>

        <p>{appointment.location}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 rounded-lg shadow-md px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-all"
        >
          Details
        </button>

        {appointment.status !== "cancelled" && (
          <button
            onClick={() =>
              onStatusChange(
                appointment.id,
                "approved"
              )
            }
            className="flex-1 rounded-lg shadow-md bg-emerald-700 px-3 py-2 text-sm hover:text-white cursor-pointer transition-all"
          >
            Approve
        </button>
        )}
      </div>
    </div>
  );
}