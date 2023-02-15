"use client";

import { signIn } from "next-auth/react";
import { FormEvent, RefObject, useCallback, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

export default function LoginForm() {
  const usernameLoginRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const login = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const credentials = {
      username: usernameLoginRef.current?.value,
      password: pwdRef.current?.value,
    };
    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    console.log({ res });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={login}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Identifiant</span>
        </label>
        <input
          type="text"
          placeholder="..."
          className="input-bordered input w-full max-w-xs drop-shadow-md"
          ref={usernameLoginRef}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Mot de passe</span>
        </label>
        <PasswordInput ref={pwdRef} />
      </div>
      <button className="btn-success btn" type="submit">
        Se connecter
      </button>
    </form>
  );
}

function PasswordInput({ ref }: { ref: RefObject<HTMLInputElement> }) {
  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = useCallback(() => {
    setShowPwd((prev) => !prev);
  }, []);
  return (
    <div className="flex items-center justify-end">
      <input
        // type="password"
        type={showPwd ? "text" : "password"}
        placeholder="..."
        className="input-bordered input w-full max-w-xs drop-shadow-md"
        ref={ref}
      />
      <span
        className="btn-ghost btn-sm btn-circle btn absolute mr-2 cursor-pointer"
        onClick={toggleShowPwd}
      >
        {showPwd ? <EyeOff /> : <Eye />}
      </span>
    </div>
  );
}
