import CenterWrapper from "@/components/CenterWrapper";
import AuthRepository from "@/lib/db/repository/AuthRepository";
import UserRepository from "@/lib/db/repository/UserRepository";
import UserManagementForm from "./UserManagementForm";
import UserManagementInitializer from "./UserManagementInitializer";
import { setUserManagementProps } from "./userManagementStore";
import UserManagementTable from "./UserManagementTable";

export default async function UtilisateursPage() {
  const [users, droits, roles] = await Promise.all([
    UserRepository.getAll(),
    AuthRepository.getAllDroits(),
    AuthRepository.getAllRoles(),
  ]);
  setUserManagementProps({ users });

  return (
    <CenterWrapper className="mt-2 flex-col gap-1">
      <UserManagementInitializer users={users} />
      <UserManagementForm />
      <UserManagementTable droits={droits} roles={roles} />
    </CenterWrapper>
  );
}
