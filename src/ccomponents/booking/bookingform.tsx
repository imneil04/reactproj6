"use client";

import { useState } from "react";
import BookingCalendar from "./bookingcalendar";
import TimeSlotPicker from "./timeslotpicker";
import BookingSuccessModal from "./bookingsuccessmodal";
import { motion, AnimatePresence } from "motion/react";

export default function BookingForm() {

  //picking appointment slots state mgt
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  //form fields
  const [formData, setFormData] = useState({
    parent_name: "",
    parent_email: "",
    phone: "",
    child_name: "",
    child_age: "",
    location: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  //handler type
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setShowSuccess(true);

      setFormData({
        parent_name: "",
        parent_email: "",
        phone: "",
        child_name: "",
        child_age: "",
        location: "",
        notes: "",
      });

      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

    return(
        <>
            <div className="min-h-screen">
                    <div className="flex justify-center">
                        <button 
                            onClick={() => setOpen(!open)}
                            className="bg-amber-600 hover:bg-amber-700 hover:shadow-lg text-white px-6 py-3 rounded-xl transition-all duration-200 ease-in-out cursor-pointer"
                        >
                            {open ? "Close Booking form" : "Book appointment"}
                        </button>
                    </div>
                
                <AnimatePresence>
                    {open && (
                        <>
                            {/**dark color background */}
                            {/**overlay 
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0 }}
                                onClick={() => setOpen(false)}
                                className="fixed inset-0 z-40 bg-black/50"
                            /> */}

                            {/**slide panel */}
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -20, }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -20, }}
                                transition={{ duration: 0.35, }}
                                className="overflow-hidden"
                            >
                              <div className="mb-6 flex justify-center mt-4">
                                
                                <h2 className="text-2xl font-bold">
                                    Appointment Booking
                                </h2>

                              </div> 

                                <div className="flex justify-center py-2">
                                    {/**form fields */}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6 rounded-2xl bg-gray-50 p-6 shadow-md shadow-amber-200"
                                    >

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <input
                                                type="text"
                                                name="parent_name"
                                                placeholder="Parent Name"
                                                value={formData.parent_name}
                                                onChange={handleChange}
                                                required
                                                className="rounded-lg p-3 shadow-lg"
                                            />

                                            <input
                                                type="email"
                                                name="parent_email"
                                                placeholder="Email"
                                                value={formData.parent_email}
                                                onChange={handleChange}
                                                required
                                                className="rounded-lg p-3 shadow-lg"
                                            />

                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="rounded-lg p-3 shadow-lg"
                                            />

                                            <input
                                                type="text"
                                                name="child_name"
                                                placeholder="Child Name"
                                                value={formData.child_name}
                                                onChange={handleChange}
                                                className="rounded-lg p-3 shadow-lg"
                                            />

                                            <input
                                                type="text"
                                                name="child_age"
                                                placeholder="Child Age"
                                                value={formData.child_age}
                                                onChange={handleChange}
                                                className="rounded-lg p-3 shadow-lg"
                                            />

                                            <select
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="rounded-lg p-3 shadow-lg"
                                            >
                                                <option value="">Select Location</option>
                                                <option value="Daycare">Daycare On-site</option>
                                                <option value="Virtual Remote">Virtual remote</option>
                                            </select>
                                        </div>

                                            <textarea
                                                name="notes"
                                                placeholder="Additional Notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full rounded-lg p-3 shadow-lg"
                                            />

                                            <BookingCalendar
                                                selectedDate={selectedDate}
                                                setSelectedDate={setSelectedDate}
                                            />

                                            <TimeSlotPicker
                                                selectedTime={selectedTime}
                                                setSelectedTime={setSelectedTime}
                                            />

                                        <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full rounded-xl bg-amber-500 hover:bg-amber-700 py-3 font-semibold text-white transition hover:opacity-90 cursor-pointer"
                                                >
                                                {loading ? "Submitting..." : "Book Appointment"}
                                        </button>        
                                    </form> 

                                    <BookingSuccessModal
                                        isOpen={showSuccess}
                                        onClose={() => setShowSuccess(false)}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>      
            </div>
        </>
    );
}