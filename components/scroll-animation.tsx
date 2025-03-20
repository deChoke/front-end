"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: "1" | "2" | "3"
}

const ScrollAnimation = ({ children, className = "", delay = "1" }: ScrollAnimationProps) => {
  const delays = {
    "1": 0,
    "2": 0.2,
    "3": 0.4,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delays[delay] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation

