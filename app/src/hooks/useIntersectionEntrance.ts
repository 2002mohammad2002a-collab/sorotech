import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useIntersectionEntrance(
  selector: string,
  options?: {
    threshold?: number;
    stagger?: number;
    duration?: number;
    y?: number;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const { stagger = 0.1, duration = 0.6, y = 30 } = options || {};

    gsap.set(elements, { opacity: 0, y });

    const triggers: ScrollTrigger[] = [];

    elements.forEach((el, i) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            delay: i * stagger,
            ease: 'power2.out',
          });
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [selector, options]);

  return containerRef;
}
