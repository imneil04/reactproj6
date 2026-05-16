interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingSuccessModal({
  isOpen,
  onClose,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Booking Successful
          </h2>

          <p className="text-gray-600">
            Your appointment has been submitted successfully.
          </p>

          <button
            onClick={onClose}
            className="rounded-xl bg-black px-5 py-2 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}