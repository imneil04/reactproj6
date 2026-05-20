import { ParentAppointment } from "./parentappointmentlist";

//strong type properties - helps with error tracking and debugging
interface ParentAppointmentCardProps {
  appointment: ParentAppointment;

  onView: () => void;
  onCancel: (id: string) => void;
}

export default function ParentAppointmentCard({
  appointment,
  onView, onCancel
}: ParentAppointmentCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-bold">
            {appointment.child_name}
          </h2>

          <p className="text-xs text-gray-500">
            {appointment.location}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {appointment.subject}
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-medium ${
            appointment.status === "approved"
              ? "bg-green-100 text-green-700"
              : appointment.status ===
                "cancelled"
              ? "bg-red-100 text-red-700"
              : appointment.status ===
                "completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>{appointment.appointment_date}</p>

        <p>{appointment.appointment_time}</p>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={onView}
          className="mt-4 w-full rounded-lg shadow-md px-1 py-1 text-sm hover:bg-gray-100 cursor-pointer transition-all"
        >
          View Details
        </button>

        {appointment.status === "pending" && (
            <button
            onClick={() => onCancel(appointment.id)}
            className="mt-4 w-full rounded-lg shadow-md px-3 py-2 text-sm hover:bg-red-400 hover:text-white bg-amber-200 cursor-pointer transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}