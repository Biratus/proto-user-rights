"use client";

import DropdownCheck from "@/components/DropdownCheck";
import { updateUserDroits, updateUserRoles } from "@/lib/dataAccess";
import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import { useState } from "react";

export default function UserRightManagement({
  user: originalUser,
  droits,
  roles,
}: {
  user: UtilisateurWithRights;
  droits: string[];
  roles: string[];
}) {
  const [user, setUser] = useState(originalUser);

  const updateRoles = async (newRoles: string[]) => {
    const response = await updateUserRoles(user, newRoles);
    if (response.status) {
      setUser((prev) => ({ ...prev, roles: [...newRoles] }));
    } else console.error("KO", response.message);
  };

  const updateDroits = async (newDroits: string[]) => {
    const response = await updateUserDroits(user, newDroits);
    if (response.status) {
      setUser((prev) => ({ ...prev, droits: [...newDroits] }));
    } else console.error("KO", response.message);
  };

  return (
    <div className="collapse-plus collapse overflow-visible">
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex justify-between rounded-xl bg-gradient-to-b from-transparent to-primary text-lg font-bold text-neutral peer-checked:bg-gradient-to-t">
        <span>
          {user.username} {user.type}
        </span>
        {/* <span>
          <button className="btn-success btn-sm btn-square btn">
            <Check />
          </button>
        </span> */}
      </div>
      <div className="collapse-content peer-checked:overflow-visible">
        <div className="ml-5 flex flex-col gap-3 rounded-lg border border-base-300 p-4 text-base-content shadow-inner">
          <div className="flex flex-row items-center gap-3 text-sm font-bold">
            <span>Roles</span>
            <DropdownCheck
              items={roles.map((r) => ({
                label: r,
                value: r,
                selected: user.roles.includes(r),
              }))}
              onSubmit={updateRoles}
            />
          </div>
          <AuthList items={user.roles} />
          <div className="flex flex-row items-center gap-3 text-sm font-bold ">
            <span>Droits</span>
            <DropdownCheck
              items={droits.map((d) => ({
                label: d,
                value: d,
                selected: user.droits.includes(d),
              }))}
              onSubmit={updateDroits}
            />
          </div>
          <AuthList items={user.droits} />
        </div>
      </div>
    </div>
  );
}

function AuthList({ items }: { items: string[] }) {
  return (
    <div className="ml-4 flex gap-3">
      {items.map((label, i) => (
        <div key={i} className="badge-primary badge badge-md">
          {label}
        </div>
      ))}
    </div>
  );
}
