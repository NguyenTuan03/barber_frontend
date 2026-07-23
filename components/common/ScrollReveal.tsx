"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0.1,
  duration = 0.6,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;

    // Check immediately on mount if element is already inside or above viewport
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      timerId = setTimeout(() => setIsVisible(true), 0);
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }

    if (typeof IntersectionObserver === "undefined") {
      timerId = setTimeout(() => setIsVisible(true), 0);
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px", // Trigger 50px before entering viewport for smooth UX
      }
    );

    observer.observe(currentRef);

    return () => {
      if (timerId) clearTimeout(timerId);
      observer.unobserve(currentRef);
    };
  }, []);

  const getTransformStyle = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    if (direction === "up") return "translate3d(0, 30px, 0)";
    if (direction === "down") return "translate3d(0, -30px, 0)";
    if (direction === "left") return "translate3d(30px, 0, 0)";
    if (direction === "right") return "translate3d(-30px, 0, 0)";
    return "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyle(),
        transition: isVisible
          ? `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`
          : "none",
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

