import { modules, toSerializedModule } from "@/lib/realData";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import EvalutationStagiaire from "./EvalutationStagiaire";

type ModulePageProps = {
  params: { id: string };
};

export default async function ModulePage({ params: { id } }: ModulePageProps) {
  const session = await getServerSession(authOptions);

  const mod = modules.find((m) => m.id == id);
  if (!mod) return notFound();

  if (session && session.user.type === "STAGIAIRE")
    return <EvalutationStagiaire module={toSerializedModule(mod)} />;
  return <h1>Page du module {mod.name}</h1>;
}
