"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useRef } from "react";

export default function Home() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const login = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const credentials = {
      username: usernameRef.current?.value,
      password: pwdRef.current?.value,
    };
    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    console.log({ res });
  };
  return (
    <>
      <form onSubmit={login}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Identifiant</span>
          </label>
          <input
            type="text"
            placeholder="..."
            className="input-bordered input w-full max-w-xs"
            ref={usernameRef}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <input
            type="password"
            placeholder="..."
            className="input-bordered input w-full max-w-xs"
            ref={pwdRef}
          />
        </div>
        <button className="btn-success btn" type="submit">
          Se connecter
        </button>
      </form>
    </>
  );
}
