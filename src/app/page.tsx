import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UserHomePage from "./(homepages)/UserHomePage";
import LoginPage from "./LoginPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return session ? <UserHomePage user={session.user} /> : <LoginPage />;
}

/*
admin: admin
formateur: formateur
stagiaire: stagiaire
*/
