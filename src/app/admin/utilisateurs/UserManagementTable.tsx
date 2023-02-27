"use client";

import { useFilteredUsers } from "./userManagementStore";
import UserRightManagement from "./UserRightManagement";

export default function UserManagementTable({
  droits,
  roles,
}: {
  droits: string[];
  roles: string[];
}) {
  const filteredUsers = useFilteredUsers();

  return (
    <table className="table-zebra table h-fit max-h-full w-4/5">
      <thead>
        <tr>
          <th>Identifiant</th>
          <th>Type</th>
          <th>Roles</th>
          <th>Droits</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <UserRightManagement
            key={user.id}
            user={user}
            droits={droits}
            roles={roles}
          />
        ))}
      </tbody>
    </table>
  );
}
