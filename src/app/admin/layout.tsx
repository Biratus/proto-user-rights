import Link from "next/link";
import { PropsWithChildren } from "react";
import FloatingNavBar from "./formateurs/FloatingNavBar";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <FloatingNavBar
        style={{ className: "flex flex-row gap-2 w-full" }}
        pinnedStyle={{ className: "glass rounded-box bg-transparent m-4" }}
      >
        <Link href="/admin/utilisateurs" className="btn-ghost btn">
          Utilisateurs
        </Link>
        <div className="divider divider-horizontal"></div>
        <Link href="/admin/formateurs" className="btn-ghost btn">
          Formateurs
        </Link>
      </FloatingNavBar>
      {children}
    </>
  );
}
