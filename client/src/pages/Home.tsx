import { FallingHearts } from "@/components/FallingHearts";
import { LoveCalendar } from "@/components/LoveCalendar";
import { ChatBox } from "@/components/ChatBox";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { motion } from "framer-motion";

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
          <p className="text-xl md:text-2xl text-muted-foreground font-serif mt-4 italic">
            Connecting our hearts, one message at a time
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
                "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
              </p>
              <p className="mt-4 font-serif text-sm text-muted-foreground">— Maya Angelou</p>
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
          Made with love, just for us.
        </motion.footer>

      </div>
    </div>
  );
}
