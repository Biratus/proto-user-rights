"use client";

import { upperFirst } from "@/lib/strings";
import cn from "classnames";
import { ChangeEvent, useCallback } from "react";
import { Trash, X } from "react-feather";
import { useUserManagementFilter } from "./userManagementStore";

const userType = ["ADMIN", "FORMATEUR", "STAGIAIRE"].map((e) => ({
  label: upperFirst(e),
  value: e,
}));

export default function UserManagementForm() {
  const { filter, setFilter, resetFilter, isEmpty } = useUserManagementFilter();
  const setUsername = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) =>
      setFilter({ username: evt.target.value }),
    [setFilter]
  );
  const resetUsername = useCallback(
    () => setFilter({ username: "" }),
    [setFilter]
  );

  const setUserType = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) =>
      setFilter({ userType: evt.target.value }),
    [setFilter]
  );
  const resetUserType = useCallback(
    () => setFilter({ userType: "" }),
    [setFilter]
  );
  return (
    <div className="glass flex h-fit grow flex-col gap-3 rounded-lg border border-base-200 p-2 shadow-inner">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">Recherche</span>
        <button
          className={cn("btn-outline btn-primary btn-square btn-sm btn ", {
            invisible: isEmpty(),
            visible: !isEmpty(),
          })}
          onClick={resetFilter}
        >
          <Trash size={16} />
        </button>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Identifiant</span>
        </label>
        <div className="input-group">
          <input
            type="text"
            className="input-bordered input"
            placeholder="..."
            value={filter.username}
            onChange={setUsername}
          />
          <button className="btn" onClick={resetUsername}>
            <X />
          </button>
        </div>
      </div>
      <div className="form-control w-full ">
        <div className="input-group w-full">
          <select
            className="select-bordered select"
            value={filter.userType}
            onChange={setUserType}
          >
            <option disabled value="">
              Type d&apos;utilisateur
            </option>
            {userType.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button className="btn" onClick={resetUserType}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
