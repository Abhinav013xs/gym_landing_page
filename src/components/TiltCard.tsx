"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number; // Maximum tilt angle in degrees
}

export default function TiltCard({ children, className = "", max = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Normalized motion values for cursor position [0, 1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map normalized cursor coordinates to rotation degrees
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), {
    damping: 25,
    stiffness: 250,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), {
    damping: 25,
    stiffness: 250,
  });

  // Calculate dynamic glare highlight center coordinates
  const glareX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), {
    damping: 25,
    stiffness: 250,
  });
  const glareY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), {
    damping: 25,
    stiffness: 250,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of mouse relative to card bounds
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize between 0 and 1
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Return smoothly back to flat center alignment
    x.set(0.5);
    y.set(0.5);
  };

  // Combine glare X and Y coordinates dynamically
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.08) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
      }}
      className={`card-3d relative preserve-3d group ${className}`}
    >
      {/* Glare Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: glareBackground }}
      />
      {/* Content wrapper preserving 3D space */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" as const }} className="h-full preserve-3d">
        {children}
      </div>
    </motion.div>
  );
}
