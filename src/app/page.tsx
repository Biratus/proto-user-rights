"use client";

import LoadingBar from "@/components/LoadingBar";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Utilisateur } from "@/lib/db/repository/UserRepository";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  const register = useCallback(() => setLoginOrRegister(false), []);
  const login = useCallback(() => setLoginOrRegister(true), []);

  if (status === "loading") return <LoadingBar />;

  return status === "authenticated" ? (
    <>Bienvenue {(session.user as Utilisateur).username}</>
  ) : (
    <div className="flex h-screen w-screen flex-row">
      <div className="flex w-1/2 items-center justify-center bg-base-300 p-5">
        <span className="rotate-45 text-center text-7xl">
          La super image d'accueil AJC
        </span>
      </div>
      <div className="flex w-1/2 items-center justify-center shadow-2xl">
        <div className="absolute top-0 w-1/2 bg-ajcYellow p-6 text-center">
          Bienvenue sur le nouvel outil de gestion d'AJC
        </div>
        {loginOrRegister && (
          <div>
            <h2 className="text-bold mb-2 text-center text-2xl">Connexion</h2>
            <LoginForm />
            <a className="link mt-2 block w-full text-right" onClick={register}>
              S'inscrire
            </a>
          </div>
        )}
        {!loginOrRegister && (
          <div>
            <h2 className="text-bold mb-2 text-center text-2xl">Inscription</h2>
            <RegisterForm
              onRegister={(createdUser) => console.log(createdUser)}
            />
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
*/
