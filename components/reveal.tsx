"use client";

import { motion } from "framer-motion";
import { type HTMLAttributes, type PropsWithChildren } from "react";

export function Reveal({ children, className }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
