interface TimeSlotPickerProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

export default function TimeSlotPicker({
  selectedTime,
  setSelectedTime,
}: TimeSlotPickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Select Time Slot</h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => setSelectedTime(slot)}
            className={`rounded-xl shadow-lg p-3 transition-all duration-200 ease-in-out cursor-pointer ${
              selectedTime === slot
                ? "bg-amber-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}