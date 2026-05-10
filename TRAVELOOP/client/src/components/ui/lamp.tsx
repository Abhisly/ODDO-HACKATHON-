"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center w-full z-0",
        className
      )}
    >
      {/* Absolute Background Lighting Engine */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-start justify-center overflow-visible">
        
        {/* Massive Ambient Red Glow (Spans whole page) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-20%] w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/40 via-red-600/5 to-transparent z-0"
        />

        {/* Central Intense Core (The "Lamp Bulb") */}
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          animate={{ opacity: 1, width: "40rem" }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 h-32 rounded-full bg-red-500/80 blur-[80px] z-10"
        />

        {/* The Downward Beam */}
        <motion.div
          initial={{ opacity: 0, height: "10rem" }}
          animate={{ opacity: 1, height: "60vh" }}
          transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
          style={{
            clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)',
          }}
          className="absolute top-0 w-[80vw] max-w-[80rem] bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent blur-3xl z-0"
        />
        
        {/* The Horizontal Light Fixture Flare */}
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          animate={{ opacity: 1, width: "60rem" }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="absolute top-[10%] h-px bg-gradient-to-r from-transparent via-red-300 to-transparent shadow-[0_0_20px_rgba(252,165,165,0.8)] z-20"
        />
      </div>

      <div className="relative z-50 flex flex-col items-center px-5 w-full pt-32">
        {children}
      </div>
    </div>
  );
};
