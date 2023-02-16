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
      <div className="flex w-1/2 flex-col gap-2">
        {users.map((user) => (
          <UserRightManagement
            key={user.id}
            user={user}
            droits={droits}
            roles={roles}
          />
        ))}
      </div>
    </CenterWrapper>
  );
}
