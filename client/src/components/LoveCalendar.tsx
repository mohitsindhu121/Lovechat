import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

export function LoveCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl shadow-primary/5 hover:border-primary/40 transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif text-primary mb-1">Our Days</h2>
          <p className="text-muted-foreground text-sm">Every moment counts</p>
        </div>
        
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl border border-primary/10 bg-white/50 p-3 pointer-events-none select-none"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md shadow-primary/30",
              day_today: "bg-secondary text-secondary-foreground font-bold",
            }}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-primary font-heading text-xl">
            {date ? date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
