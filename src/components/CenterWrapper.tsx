import { Style } from "@/lib/types";
import { PropsWithChildren } from "react";

export default function CenterWrapper({
  style = { className: "" },
  children,
}: { style?: Style } & PropsWithChildren) {
  return (
    <div
      className={`flex w-full justify-center ${style.className}`}
      style={{ ...style.props }}
    >
      {children}
    </div>
  );
}
