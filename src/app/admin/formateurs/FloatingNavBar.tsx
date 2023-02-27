"use client";

import { Style } from "@/lib/types";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type FloatingNavBarProps = {
  style?: Style;
  pinnedStyle?: Style;
};

export default function FloatingNavBar({
  style,
  pinnedStyle,
  children,
}: PropsWithChildren & FloatingNavBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsPinned(e.intersectionRatio < 1);
      },
      { threshold: [1] }
    );
    observer.observe(barRef.current!);
    return () => {
      if (barRef.current) observer.unobserve(barRef.current);
    };
  }, []);

  return (
    <div className={`sticky -top-1 z-20 flex justify-center`} ref={barRef}>
      <div
        className={`navbar bg-secondary ${style ? style.className : ""} ${
          isPinned && pinnedStyle ? pinnedStyle.className : ""
        } transition-all duration-300`}
        style={{
          ...(style && style.props ? style.props : {}),
          ...(isPinned && pinnedStyle && pinnedStyle.props
            ? pinnedStyle.props
            : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}
