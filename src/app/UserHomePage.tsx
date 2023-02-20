import CenterWrapper from "@/components/CenterWrapper";
import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";

export default function UserHomePage({
  user,
}: {
  user: UtilisateurWithRights;
}) {
  return (
    <CenterWrapper>
      <div className="mt-4 text-2xl font-bold">
        Page d&apos;accueil de{" "}
        <span className="underline">{user.username}</span>
      </div>
    </CenterWrapper>
  );
}
