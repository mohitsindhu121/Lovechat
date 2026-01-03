import { FallingHearts } from "@/components/FallingHearts";
import { LoveCalendar } from "@/components/LoveCalendar";
import { ChatBox } from "@/components/ChatBox";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      {/* Background Music Player */}
      <BackgroundMusic />
      
      {/* Background Effects */}
      <FallingHearts />
      
      {/* Decorative Blur Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-200/30 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        
        {/* Navigation / Actions */}
        <div className="flex justify-end mb-8">
          <Link href="/movies">
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 text-primary">
              <Film className="mr-2 h-4 w-4" /> Our Movie Tracker
            </Button>
          </Link>
        </div>
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl text-primary drop-shadow-sm mb-2 hover:scale-105 transition-transform duration-500 cursor-default">
              For Us ❤️
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent absolute -bottom-2 left-0" 
            />
          </div>
          <p className="text-xl md:text-2xl text-primary/70 font-serif mt-4 italic">
            Ángel and Sarai, dos corazones, una historia.
          </p>
        </motion.header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Calendar & Quote */}
          <div className="lg:col-span-5 space-y-8">
            <LoveCalendar />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 text-center shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
            >
              <p className="font-heading text-2xl text-primary/80 leading-relaxed">
                "En todo el mundo, no hay corazón para mí como el tuyo. En todo el mundo, no hay amor para ti como el mío."
              </p>
              <p className="mt-4 font-serif text-sm text-muted-foreground">— Sarai & Angel</p>
            </motion.div>
          </div>

          {/* Right Column: Live Chat */}
          <div className="lg:col-span-7 h-full">
            <ChatBox />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 text-center text-primary/40 text-sm font-serif"
        >
          Made with love, just for Sarai & Angel.
        </motion.footer>

      </div>
    </div>
  );
}
