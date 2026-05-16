interface BookingCalendarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function BookingCalendar({
  selectedDate,
  setSelectedDate,
}: BookingCalendarProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Select Date</label>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        required
        className="w-full rounded-lg p-3 shadow-lg"
      />
    </div>
  );
}