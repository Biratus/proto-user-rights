"use client";

import AlertSuccess from "@/components/AlertSuccess";
import { PasswordInput } from "@/components/PasswordInput";
import { updateUserPassword } from "@/lib/dataAccess";
import { Utilisateur } from "@/lib/db/repository/UserRepository";
import { useSession } from "next-auth/react";
import { FormEvent, useCallback, useRef, useState } from "react";
const mockUser: Utilisateur = {
  username: "",
  password: "",
  type: "",
};
export default function AccountPage() {
  const pwdRef = useRef<HTMLInputElement>(null);
  const { data: sessionData } = useSession();
  const [pwdUpdated, setPwdUpdated] = useState(false);

  const user = sessionData ? (sessionData.user as Utilisateur) : mockUser;

  const updatePassword = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();
      const res = await updateUserPassword({
        ...user,
        password: pwdRef.current?.value,
      });
      if (res.status) {
        setPwdUpdated(true);
      } else console.error(res.message!);
    },
    [user]
  );

  return (
    <div className="flex w-full justify-center pt-4">
      <div className="flex w-1/4 flex-col gap-3">
        <div>Vous êtes {user.type}</div>
        <h2 className="text-bold mb-2 text-center text-2xl">
          Changer de mot de passe
        </h2>
        {pwdUpdated && <AlertSuccess message="Mot de passe mis à jour" />}
        <form className="flex flex-col gap-4" onSubmit={updatePassword}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nouveau mot de passe</span>
            </label>
            <PasswordInput ref={pwdRef} />
          </div>
          <button className="btn-success btn" type="submit">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
}
