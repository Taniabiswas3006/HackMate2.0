"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    tempId: 0,
    title: "Skill Roadmap",
    desc: "A personalized checklist guiding you from beginner to job-ready, one skill at a time.",
    imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80",
    route: "/roadmap"
  },
  {
    tempId: 1,
    title: "AI Guidance",
    desc: "Get personalized AI-powered insights and recommendations for your learning journey.",
    imgSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80",
    route: "/dashboard"
  },
  {
    tempId: 2,
    title: "Peer Connection",
    desc: "Find teammates with complementary skills and build stronger project teams together.",
    imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80",
    route: "/peers"
  },
  {
    tempId: 3,
    title: "Dashboard",
    desc: "Track your progress and view personalized recommendations in one place.",
    imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    route: "/dashboard"
  },
  {
    tempId: 4,
    title: "Collaboration",
    desc: "Find the perfect team for your next big project.",
    imgSrc: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&auto=format&fit=crop&q=80",
    route: "/peers"
  },
  {
    tempId: 5,
    title: "Achievements",
    desc: "Track your progress with badges and streaks as you complete milestones.",
    imgSrc: "https://images.unsplash.com/photo-1567427017947-545c5f2d4e19?w=400&auto=format&fit=crop&q=80",
    route: "/dashboard"
  },
  {
    tempId: 6,
    title: "Resources",
    desc: "Access curated tutorials, courses, and learning materials.",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80",
    route: "/roadmap"
  }
];

const cardVariants = {
  center: "bg-primary text-white border-primary z-10",
  side: "bg-card text-card-foreground border-primary/20 z-0 hover:border-primary/50"
};

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  navigate
}) => {
  const isCenter = position === 0;
  const isClickable = isCenter;

  const transformStyle = isCenter 
    ? `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(-65px) rotate(0deg)`
    : `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${position % 2 ? 15 : -15}px) rotate(${position % 2 ? 2.5 : -2.5}deg)`;

  const handleClick = () => {
    if (isClickable && testimonial.route) {
      navigate(testimonial.route);
    } else if (!isClickable) {
      handleMove(position);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out ${
        isCenter 
          ? cardVariants.center
          : cardVariants.side
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, calc(100% - 30px) 100%, 30px 100%, 0 100%, 0 0)`,
        transform: transformStyle,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,83,122,0.2)" : "0px 0px 0px 0px transparent"
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.title}
        className="mb-4 h-32 w-full object-cover"
      />
      <h3 className={`text-lg font-bold ${isCenter ? "text-white" : "text-heading"}`}>
        {testimonial.title}
      </h3>
      <p className={`mt-2 text-sm ${isCenter ? "text-white/80" : "text-body"}`}>
        {testimonial.desc}
      </p>
      {isCenter && (
        <p className={`mt-4 text-sm font-medium ${isCenter ? "text-white/80" : "text-primary"}`}>
          Click to explore →
        </p>
      )}
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(300);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const navigate = useNavigate();

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 320 : 260);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 500 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            navigate={navigate}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};