"use client";
import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".fade-in,.fade-left,.fade-right,.fade-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
