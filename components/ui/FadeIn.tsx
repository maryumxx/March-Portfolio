"use client";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  margin?: string;
  as?: "div" | "p" | "h2" | "h3" | "span" | "li" | "section";
}

export default function FadeIn({
  delay = 0,
  duration = 0.65,
  y = 20,
  x = 0,
  once = true,
  margin = "-60px",
  children,
  className,
  style,
  ...rest
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
