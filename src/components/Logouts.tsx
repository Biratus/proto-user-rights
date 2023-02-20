"use client";

import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { LogOut } from "react-feather";

export function LogoutLink() {
  const logout = useCallback(() => signOut({ callbackUrl: "/" }), []);
  return (
    <a onClick={logout}>
      <LogOut /> Logout
    </a>
  );
}

export function LogoutButton() {
  const logout = useCallback(() => signOut({ callbackUrl: "/" }), []);

  return (
    <button className="btn-ghost btn-circle btn" onClick={logout}>
      <LogOut />
    </button>
  );
}
