"use client";

import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const GlobalDrawerId = "global-drawer";
export default function MenuDrawer() {
  const { data: sessionData } = useSession();
  const user = sessionData ? (sessionData.user as UtilisateurWithRights) : null;

  return (
    <div className="drawer-side">
      <label htmlFor={GlobalDrawerId} className="drawer-overlay"></label>
      <ul className="menu w-80 bg-base-100 p-4 text-base-content drop-shadow-xl">
        <li className="menu-title">
          <span>Accès rapide</span>
        </li>
        <li>
          <a>Filières</a>
        </li>
        <li>
          <a>Formateurs</a>
        </li>
        <li>
          <a>Clients</a>
        </li>
        {user && user.roles?.includes("ADMINISTRATEUR") && (
          <>
            <li className="menu-title">
              <span>Administrateur</span>
            </li>
            <li>
              <Link href="/admin/utilisateurs">Utilisateurs</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
