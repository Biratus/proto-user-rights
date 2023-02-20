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
    <tr>
      <td>{user.username}</td>
      <td>{user.type}</td>
      <td className="w-1/3">
        <div className="wrap flex items-center gap-2">
          <AuthList items={user.roles} />
          <DropdownCheck
            size="sm"
            items={roles.map((r) => ({
              label: r,
              value: r,
              selected: user.roles.includes(r),
            }))}
            onSubmit={updateRoles}
          />
        </div>
      </td>
      <td className="w-1/3">
        <div className="wrap flex items-center gap-2">
          <AuthList items={user.droits} />
          <DropdownCheck
            side="left"
            size="sm"
            items={droits.map((d) => ({
              label: d,
              value: d,
              selected: user.droits.includes(d),
            }))}
            onSubmit={updateDroits}
          />
        </div>
      </td>
    </tr>
  );
}

function AuthList({ items }: { items: string[] }) {
  if (items.length == 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((label, i) => (
        <div key={i} className="badge badge-primary badge-md">
          {label}
        </div>
      ))}
    </div>
  );
}
