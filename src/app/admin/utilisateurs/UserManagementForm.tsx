"use client";

import { upperFirst } from "@/lib/strings";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Trash, X } from "react-feather";
import { useUserManagementFilter } from "./userManagementStore";

const userType = ["ADMIN", "FORMATEUR", "STAGIAIRE"].map((e) => ({
  label: upperFirst(e),
  value: e,
}));

export default function UserManagementForm() {
  const { filter, setFilter, resetFilter } = useUserManagementFilter();

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
  const noFilter = useMemo(
    () => filter.username == "" && filter.userType == "",
    [filter]
  );

  return (
    <div className="inner-shadow flex h-fit grow flex-col gap-3 rounded-lg border border-base-200 p-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Recherche</span>
        <button
          className={`btn-primary btn-outline btn-square btn-sm btn ${
            noFilter ? "invisible" : "visible"
          }`}
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
