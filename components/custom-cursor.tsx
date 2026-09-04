'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isView, setIsView] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      setHidden(false);
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setIsView(true);
        setIsHovering(true);
      } else if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsView(false);
        setIsHovering(true);
      } else {
        setIsView(false);
        setIsHovering(false);
      }
    };

    const onLeave = () => setHidden(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: hidden ? 0 : 1 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-hover' : ''} ${isView ? 'cursor-view' : ''}`}
        style={{ opacity: hidden ? 0 : 1 }}
        aria-hidden="true"
      />
    </>
  );
}
