import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [, setMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const days = Array.from({ length: getDaysInMonth(date) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(date);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const selectedDay = date.getDate();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      {/* Calendar Card with beautiful gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 shadow-2xl shadow-primary/30 p-8">
        
        {/* Decorative blurs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />

        {/* Month and Year Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 mb-8"
        >
          <div className="flex items-baseline justify-center gap-4">
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">{monthName}</h2>
            <p className="text-4xl font-light text-white/90 drop-shadow-lg">{selectedDay}</p>
          </div>
        </motion.div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-white/80 text-sm font-semibold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-7 gap-2 relative z-10"
        >
          {/* Empty cells for days before month starts */}
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {days.map((day) => {
            const isSelected = day === selectedDay;
            const isToday = day === new Date().getDate() && 
                           date.getMonth() === new Date().getMonth() &&
                           date.getFullYear() === new Date().getFullYear();

            return (
              <motion.button
                key={day}
                onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), day))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square flex items-center justify-center"
              >
                {isSelected && (
                  <motion.div
                    layoutId="heart"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-rose-600 drop-shadow-lg"
                      fill="currentColor"
                    >
                      <path d="M50,90 C20,70 5,55 5,40 C5,25 15,15 25,15 C35,15 45,25 50,35 C55,25 65,15 75,15 C85,15 95,25 95,40 C95,55 80,70 50,90 Z" />
                    </svg>
                    <span className="absolute text-white font-bold text-lg drop-shadow-md">{day}</span>
                  </motion.div>
                )}

                {!isSelected && (
                  <span className={`text-lg font-semibold relative z-10 ${
                    isToday 
                      ? 'text-white drop-shadow-lg font-bold' 
                      : 'text-white/90'
                  }`}>
                    {day}
                  </span>
                )}

                {!isSelected && isToday && (
                  <div className="absolute inset-0 rounded-lg bg-white/20 border-2 border-white/40" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center relative z-10"
        >
          <p className="text-white/80 text-sm font-serif italic flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-white text-white" />
            Every day with you is special
            <Heart className="w-4 h-4 fill-white text-white" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
