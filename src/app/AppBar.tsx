"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Bell, Home, LogOut, Moon, Send, Sun, User } from "react-feather";
import unknownUser from "../../public/unknown_user.png";

export default function AppBar() {
  const { data: session, status } = useSession();
  const logout = useCallback(() => signOut(), []);

  if (status == "unauthenticated" || status === "loading") return null;
  return (
    <div className="navbar bg-ajcYellow-light">
      <div className="navbar-start">
        <Link href="/" className="btn-rounded btn-ghost btn">
          <Home />
        </Link>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="input-bordered input w-96 bg-opacity-60"
          placeholder="Rechercher..."
        />
      </div>
      <div className="navbar-end gap-3">
        <Feedback />
        <Notification />
        <AvatarMenu />
        <SwitchTheme />
        <button className="btn-ghost btn-circle btn" onClick={logout}>
          <LogOut />
        </button>
      </div>
    </div>
  );
}

function Feedback() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-primary btn m-1">
        Feedback
      </label>
      <div
        tabIndex={0}
        className="card-compact card dropdown-content glass border border-base-300 bg-base-100  p-2 shadow-xl"
      >
        <div className="card-body">
          <h3 className="card-title">Un retour à faire ?</h3>

          <textarea
            className="textarea-bordered textarea"
            placeholder="Décrivez votre bug, proposition d'amélioration, ..."
          ></textarea>
          <div className="card-actions justify-end">
            <label tabIndex={0} className="btn-success btn-sm btn">
              <Send size={18} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchTheme() {
  return (
    <label className="swap-rotate swap btn-ghost btn-circle btn p-1">
      <input type="checkbox" />

      <Sun className="swap-on fill-current" />

      <Moon className="swap-off fill-current" />
    </label>
  );
}

function AvatarMenu() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <Image alt="utilisateur" src={unknownUser} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 border border-base-300 bg-base-100 p-2 shadow-xl"
      >
        <li>
          <a>
            <Home /> Dashboard
          </a>
        </li>
        <li>
          <a>
            <User /> Mon compte
          </a>
        </li>
        <li>
          <a>
            <LogOut /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

function Notification() {
  return (
    <button className="btn-ghost btn-circle btn">
      <div className="indicator">
        <Bell />{" "}
        <span className="badge-primary badge badge-xs indicator-item">4</span>
      </div>
    </button>
  );
}
