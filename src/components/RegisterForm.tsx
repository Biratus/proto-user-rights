"use client";

import { registerUser } from "@/lib/dataAccess";
import { Utilisateur } from "@/lib/db/repository/UserRepository";
import { FormEvent, useRef } from "react";

export default function RegisterForm({
  onRegister,
}: {
  onRegister: (createdUser: Utilisateur) => void;
}) {
  const usernameRegisterRef = useRef<HTMLInputElement>(null);

  const register = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (usernameRegisterRef.current?.value) {
      const createdUser = await registerUser(
        usernameRegisterRef.current?.value
      );
      onRegister(createdUser);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={register}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Identifiant</span>
        </label>
        <input
          type="text"
          placeholder="..."
          className="input-bordered input w-full max-w-xs"
          ref={usernameRegisterRef}
        />
      </div>
      <button className="btn-success btn" type="submit">
        S&apos;inscrire
      </button>
    </form>
  );
}
