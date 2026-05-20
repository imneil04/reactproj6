import { ParentAppointment } from "./parentappointmentlist";

interface ParentAppointmentDetailsModalProps {
  appointment: ParentAppointment | null;

  onClose: () => void;
}

export default function ParentAppointmentDetailsModal({
  appointment,
  onClose,
}: ParentAppointmentDetailsModalProps) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Appointment Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">
              Child Name
            </h3>

            <p>{appointment.child_name}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Child Age
            </h3>

            <p>{appointment.child_age}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Appointment Date
            </h3>

            <p>{appointment.appointment_date}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Appointment Time
            </h3>

            <p>{appointment.appointment_time}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Location
            </h3>

            <p>{appointment.location}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Status
            </h3>

            <p className="capitalize">
              {appointment.status}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 font-semibold">
            Notes
          </h3>

          <div className="rounded-xl bg-gray-100 p-4">
            <p>
              {appointment.notes ||
                "No notes provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}