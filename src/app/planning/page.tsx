import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function PlanningPage() {
  const session = await getServerSession(authOptions);

  if (!session) return null;
  const { user } = session;

  switch (user.type) {
    case "ADMIN":
      return <h1>Planning Admin</h1>;
    case "FORMATEUR":
      return <h1>Planning Formateur</h1>;
    case "STAGIAIRE":
      return <h1>Planning Stagiaire</h1>;
  }
}
