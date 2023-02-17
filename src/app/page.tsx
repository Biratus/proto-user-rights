"use client";

import AlertError from "@/components/AlertError";
import AlertSuccess from "@/components/AlertSuccess";
import CenterWrapper from "@/components/CenterWrapper";
import LoadingBar from "@/components/LoadingBar/LoadingBar";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Utilisateur } from "@/lib/db/repository/UserRepository";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [hasRegistered, setHasRegistered] = useState<Utilisateur | null>(null);

  const register = useCallback(() => setLoginOrRegister(false), []);
  const login = useCallback(() => setLoginOrRegister(true), []);

  const onRegister = useCallback(
    (createdUser: Utilisateur) => setHasRegistered(createdUser),
    []
  );

  if (status === "loading") return <LoadingBar />;

  return status === "authenticated" ? (
    <CenterWrapper>
      <div className="mt-4 text-2xl font-bold">
        Page d&apos;accueil de{" "}
        <span className="underline">
          {(session.user as Utilisateur).username}
        </span>
      </div>
    </CenterWrapper>
  ) : (
    <div className="flex h-screen w-screen flex-row">
      <div className="flex w-1/2 items-center justify-center bg-base-300 p-5">
        <span className="-rotate-45 text-center text-7xl">
          La super image d&apos;accueil AJC
        </span>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center gap-4 shadow-2xl">
        <div className="absolute top-0 w-1/2 bg-ajcYellow p-6 text-center">
          Bienvenue sur le nouvel outil de gestion d&apos;AJC
        </div>
        {searchParams.get("callbackUrl") && (
          <AlertError message="Vous devez vous connecter pour accéder à cette page" />
        )}
        {loginOrRegister && (
          <div>
            <h2 className="text-bold mb-2 text-center text-2xl">Connexion</h2>
            <LoginForm
              callbackUrl={searchParams.get("callbackUrl") || undefined}
            />
            <a className="link mt-2 block w-full text-right" onClick={register}>
              S&apos;inscrire
            </a>
          </div>
        )}
        {!loginOrRegister && (
          <div>
            <h2 className="text-bold mb-2 text-center text-2xl">Inscription</h2>
            {hasRegistered ? (
              <div className="flex flex-col gap-4">
                <AlertSuccess message="Inscription réussi. Voici vos informations de connexion" />

                <div>
                  Identifiant:{" "}
                  <span className="font-bold">{hasRegistered.username}</span>
                </div>
                <div>
                  Mot de passe:{" "}
                  <span className="font-bold">{hasRegistered.password}</span>
                </div>
              </div>
            ) : (
              <RegisterForm onRegister={onRegister} />
            )}
            <a className="link mt-2 block w-full text-right" onClick={login}>
              Se connecter
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/*
admin: Ld4TESr1
formateur: B#_uLyB!
stagiaire: yRIIbaeb
*/
