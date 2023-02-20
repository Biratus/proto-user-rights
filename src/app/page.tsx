import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LoginPage from "./LoginPage";
import UserHomePage from "./UserHomePage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return session ? <UserHomePage user={session.user} /> : <LoginPage />;
}

/*
admin: Ld4TESr1
formateur: B#_uLyB!
stagiaire: yRIIbaeb
*/
