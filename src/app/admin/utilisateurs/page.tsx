import CenterWrapper from "@/components/CenterWrapper";
import AuthRepository from "@/lib/db/repository/AuthRepository";
import UserRepository from "@/lib/db/repository/UserRepository";
import UserRightManagement from "./UserRightManagement";

export default async function UtilisateursPage() {
  const [users, droits, roles] = await Promise.all([
    UserRepository.getAll(),
    AuthRepository.getAllDroits(),
    AuthRepository.getAllRoles(),
  ]);
  return (
    <CenterWrapper style={{ className: "mt-2" }}>
      <table className="table-zebra table w-4/5">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Type</th>
            <th>Roles</th>
            <th>Droits</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRightManagement
              key={user.id}
              user={user}
              droits={droits}
              roles={roles}
            />
          ))}
        </tbody>
      </table>
    </CenterWrapper>
  );
}
