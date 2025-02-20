import React, { useEffect, useRef, useState } from "react";

interface ScrollGradientSectionProps {
  children: React.ReactNode;
}

export function ScrollGradientSection({ children }: ScrollGradientSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [altGradient, setAltGradient] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // when half the section is visible, toggle the alternate gradient
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAltGradient(true);
          } else {
            setAltGradient(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`merged-gradient ${altGradient ? "alt" : ""}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </section>
  );
}