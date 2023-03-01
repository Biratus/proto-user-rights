"use client";

import { emptyStyle } from "@/lib/style";
import { Style } from "@/lib/types";
import cn from "classnames";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type FloatingNavBarProps = {
  style?: Style;
  pinnedStyle?: Style;
};

export default function FloatingNavBar({
  style = emptyStyle(),
  pinnedStyle = emptyStyle(),
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
    <div className="sticky -top-1 z-20 flex justify-center" ref={barRef}>
      <div
        className={cn({
          [`navbar bg-secondary transition-all duration-300 ${style.className}`]:
            true,
          [pinnedStyle.className]: isPinned,
        })}
        style={{
          ...(style.props ? style.props : {}),
          ...(isPinned && pinnedStyle.props ? pinnedStyle.props : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}
