import { StyleProps } from "@/lib/types";
import { PropsWithChildren } from "react";

export default function CenterWrapper({
  className = "",
  style = {},
  children,
}: StyleProps & PropsWithChildren) {
  return (
    <div
      className={`flex w-full justify-center ${className}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
