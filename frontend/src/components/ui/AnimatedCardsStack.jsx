"use client" 

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion"

const cardVariants = cva("absolute will-change-transform", {
  variants: {
    variant: {
      dark: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-primary/50 bg-primary/80 p-6 backdrop-blur-md",
      light:
        "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-primary/20 bg-card/80 p-6 backdrop-blur-md",
    },
  },
  defaultVariants: {
    variant: "light",
  },
})

function ContainerScroll({ children, style, className, ...props }) {
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  })

  const contextValue = React.useMemo(
    () => ({ scrollYProgress }),
    [scrollYProgress]
  )

  return React.createElement(
    "div",
    {
      ref: scrollRef,
      className: `relative min-h-[200vh] w-full ${className || ""}`,
      style: { perspective: "1000px", ...style },
      ...props,
    },
    React.createElement(
      ContainerScrollContext.Provider,
      { value: contextValue },
      children
    )
  )
}
ContainerScroll.displayName = "ContainerScroll"

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollContextProvider"
    )
  }
  return context
}

function CardsContainer({ children, className, ...props }) {
  return React.createElement(
    "div",
    {
      className: `relative ${className || ""}`,
      style: { perspective: "1000px", ...props.style },
      ...props,
    },
    children
  )
}
CardsContainer.displayName = "CardsContainer"

const CardTransformed = React.forwardRef(function CardTransformed(
  {
    arrayLength,
    index,
    incrementY = 10,
    incrementZ = 10,
    incrementRotation = -index + 90,
    className,
    variant,
    style,
    ...props
  },
  ref
) {
  const { scrollYProgress } = useContainerScrollContext()

  const start = index / (arrayLength + 1)
  const end = (index + 1) / (arrayLength + 1)
  const range = React.useMemo(() => [start, end], [start, end])
  const rotateRange = [range[0] - 1.5, range[1] / 1.5]

  const y = useTransform(scrollYProgress, range, ["0%", "-180%"])
  const rotate = useTransform(scrollYProgress, rotateRange, [
    incrementRotation,
    0,
  ])
  const transform = useMotionTemplate`translateZ(${
    index * incrementZ
  }px) translateY(${y}) rotate(${rotate}deg)`

  const dx = useTransform(scrollYProgress, rotateRange, [4, 0])
  const dy = useTransform(scrollYProgress, rotateRange, [4, 12])
  const blur = useTransform(scrollYProgress, rotateRange, [2, 24])
  const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2])
  const filter =
    variant === "light" 
      ? useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`
      : "none"

  const cardStyle = {
    top: index * incrementY,
    transform,
    backfaceVisibility: "hidden",
    zIndex: (arrayLength - index) * incrementZ,
    filter,
    ...style,
  }
  
  return React.createElement(
    motion.div,
    {
      layout: "position",
      ref: ref,
      style: cardStyle,
      className: cardVariants({ variant, className }),
      ...props,
    }
  )
})
CardTransformed.displayName = "CardTransformed"

export { ContainerScroll, CardsContainer, CardTransformed }