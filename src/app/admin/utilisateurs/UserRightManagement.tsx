"use client";

import { Utilisateur } from "@/lib/db/repository/UserRepository";
import { Check } from "react-feather";

export default function UserRightManagement({
  user,
  droits,
  roles,
}: {
  user: Utilisateur;
  droits: string[];
  roles: string[];
}) {
  return (
    <div className="collapse-plus collapse">
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex justify-between rounded-xl bg-gradient-to-b from-transparent to-neutral-200 text-lg font-bold peer-checked:bg-gradient-to-t">
        <span>
          {user.username} {user.type}
        </span>
        <span>
          <button className="btn-success btn-sm btn-square btn">
            <Check />
          </button>
        </span>
      </div>
      <div className="collapse-content">
        <ul className="menu menu-compact ml-5 rounded-lg border border-base-300 p-4 text-base-content shadow-inner">
          <li className="menu-title">
            <span>Roles</span>
          </li>
          {user.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
          <li className="menu-title">
            <span>Droits</span>
          </li>
          {user.droits.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
