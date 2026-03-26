"use client"

import * as React from "react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "./AnimatedCardsStack"

const featureCards = [
  {
    icon: "🎯",
    title: "Skill Roadmap",
    description: "A personalized checklist guiding you from beginner to job-ready, one skill at a time.",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: "🏆",
    title: "Opportunity Discovery",
    description: "Curated hackathons, internships, and events matched to your skill level and interests.",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
  },
  {
    icon: "🤝",
    title: "Peer Connect",
    description: "Find teammates with complementary skills and build stronger project teams together.",
    bgColor: "bg-accent/20",
    borderColor: "border-accent/30",
  },
]

export function FeaturesCards() {
  return (
    <ContainerScroll className="h-[200vh]">
      <div className="sticky left-0 top-0 h-screen flex items-center justify-center py-12">
        <CardsContainer className="mx-auto h-[400px] w-[350px]">
          {featureCards.map((feature, index) => (
            <CardTransformed
              arrayLength={featureCards.length}
              key={index}
              index={index + 2}
              variant="light"
              className={`${feature.bgColor} ${feature.borderColor} items-start justify-between`}
            >
              <div className="flex flex-col items-start gap-3">
                <div className="flex size-14 items-center justify-center rounded-xl bg-white/50 text-3xl">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-heading">{feature.title}</h4>
                  <p className="mt-2 text-sm text-body">{feature.description}</p>
                </div>
              </div>
            </CardTransformed>
          ))}
        </CardsContainer>
      </div>
    </ContainerScroll>
  )
}