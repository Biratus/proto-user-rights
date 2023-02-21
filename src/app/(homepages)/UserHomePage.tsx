import CenterWrapper from "@/components/CenterWrapper";
import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import StagiaireHomePage from "./StagiaireHomePage";

export default function UserHomePage({
  user,
}: {
  user: UtilisateurWithRights;
}) {
  if (user.type == "STAGIAIRE")
    return (
      <CenterWrapper className="homepage">
        {/* <div className="absolute -z-10 h-screen w-screen">
          <Image alt="Image de fond" src={bgImage} quality={100} fill={true} />
        </div> */}
        <StagiaireHomePage />
      </CenterWrapper>
    );
  return (
    <CenterWrapper>
      <div className="mt-4 text-2xl font-bold">
        Page d&apos;accueil de{" "}
        <span className="underline">{user.username}</span>
      </div>
    </CenterWrapper>
  );
}
