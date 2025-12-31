import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-white/90 via-rose-50/50 to-white/90 backdrop-blur-sm border-2 border-primary/30 shadow-2xl shadow-primary/15 hover:shadow-primary/25 hover:border-primary/50 transition-all duration-300">
        
        {/* Decorative Heart Background Elements */}
        <div className="absolute top-4 right-4 text-primary/10 opacity-40">
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <div className="absolute bottom-4 left-4 text-primary/10 opacity-30">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        {/* Header with romantic styling */}
        <motion.div 
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>
            <h2 className="text-3xl font-heading text-primary">Our Days Together</h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>
          </div>
          <p className="text-primary/60 text-sm font-serif italic">Every moment with you is precious</p>
        </motion.div>
        
        {/* Calendar Container with romantic styling */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-2xl border-2 border-primary/20 p-4 shadow-inner">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="pointer-events-none select-none"
              classNames={{
                day_selected: "bg-gradient-to-br from-primary to-rose-500 text-white hover:from-primary hover:to-rose-500 focus:from-primary focus:to-rose-500 shadow-lg shadow-primary/40 rounded-lg font-bold transform scale-110",
                day_today: "bg-secondary text-secondary-foreground font-bold border-2 border-primary/40 rounded-lg",
                head_cell: "text-primary font-serif font-semibold text-sm",
                cell: "text-sm",
              }}
            />
          </div>
        </motion.div>

        {/* Selected Date Display with romantic styling */}
        <motion.div 
          className="mt-8 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-rose-400/10 rounded-xl p-4 border border-primary/20">
            <p className="text-primary/60 text-xs font-semibold uppercase tracking-wider mb-1">Selected Date</p>
            <p className="text-primary font-heading text-2xl leading-relaxed">
              {date ? date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
            </p>
          </div>
        </motion.div>

        {/* Romantic message at bottom */}
        <motion.div
          className="mt-6 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-primary/50 text-xs font-serif italic">
            Love grows with every passing day
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
