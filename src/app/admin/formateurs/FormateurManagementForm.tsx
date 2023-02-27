"use client";

import DoubleRangeInput from "@/components/DoubleRangeInput";
import DropdownCheck from "@/components/DropdownCheck";
import { allComp } from "@/lib/realData";
import { ChangeEvent, PropsWithChildren, useCallback } from "react";
import { Trash, X } from "react-feather";
import {
  useFilteredFormateurs,
  useFormateurManagementFilter,
} from "./formateurManagementStore";

export default function FormateurManagementForm() {
  const { filter, setFilter, resetFilter, isEmpty } =
    useFormateurManagementFilter();
  const formateurs = useFilteredFormateurs();

  const setInfos = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) =>
      setFilter({ infos: evt.target.value }),
    [setFilter]
  );

  const resetInfos = useCallback(() => setFilter({ infos: "" }), [setFilter]);

  const changeTJM = useCallback(
    (values: number[]) => setFilter({ TJM: values }),
    [setFilter]
  );

  const resetTJM = useCallback(() => setFilter({ TJM: [0, 1000] }), []);

  const changeSatisfaction = useCallback(
    (values: number[]) => setFilter({ satisfaction: values }),
    [setFilter]
  );

  const resetSatisfaction = useCallback(
    () => setFilter({ satisfaction: [0, 100] }),
    []
  );

  const changeIntExt = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) =>
      setFilter({ interne: evt.target.value == "interne" }),
    [setFilter]
  );

  const resetIntExt = useCallback(() => setFilter({ interne: undefined }), []);

  const changeBlacklist = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) =>
      setFilter({ blacklist: evt.target.value == "blacklist" }),
    [setFilter]
  );

  const resetBlacklist = useCallback(
    () => setFilter({ blacklist: undefined }),
    [setFilter]
  );

  const noSkills = useCallback(() => setFilter({ skills: [] }), [setFilter]);
  const allSkills = useCallback(
    () => setFilter({ skills: allComp }),
    [setFilter]
  );
  const changeSkills = useCallback(
    (comps: string[]) => setFilter({ skills: comps }),
    [setFilter]
  );

  return (
    <div className="rounded-box glass m-1 space-y-2 p-5">
      <div className="flex items-center gap-4 border-b border-base-300 ">
        <span className="text-lg font-bold">
          Recherche ({formateurs.length} Formateurs)
        </span>
        <button
          className={`btn-outline btn-primary btn-sm btn-square btn ${
            isEmpty() ? "invisible" : "visible"
          }`}
          onClick={resetFilter}
        >
          <Trash size={16} />
        </button>
      </div>
      <SearchPart title="Informations générales">
        <div className="flex flex-row items-end gap-3">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                className="input-bordered input"
                placeholder="..."
                value={filter.infos}
                onChange={setInfos}
              />
              <button className="btn" onClick={resetInfos}>
                <X />
              </button>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="form-control w-auto">
            <label className="label justify-end">
              <button
                className={`btn-xs btn ${
                  filter.interne === undefined ? "btn-disabled" : ""
                }`}
                onClick={resetIntExt}
              >
                tous
              </button>
            </label>
            <select
              className="select-bordered select"
              onChange={changeIntExt}
              value={
                filter.interne === undefined
                  ? ""
                  : filter.interne
                  ? "interne"
                  : "externe"
              }
            >
              <option disabled value={""}>
                Interne/Externe
              </option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
            </select>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="form-control w-auto">
            <label className="label justify-end">
              <button
                className={`btn-xs btn ${
                  filter.blacklist === undefined ? "btn-disabled" : ""
                }`}
                onClick={resetBlacklist}
              >
                tous
              </button>
            </label>
            <select
              className="select-bordered select"
              onChange={changeBlacklist}
              value={
                filter.blacklist === undefined
                  ? ""
                  : filter.blacklist
                  ? "blacklist"
                  : "notblacklist"
              }
            >
              <option disabled value={""}>
                Blacklisté?
              </option>
              <option value="blacklist">Blacklisté</option>
              <option value="notblacklist">Non blacklisté</option>
            </select>
          </div>
        </div>
      </SearchPart>
      <div className="flex flex-row space-x-5">
        <div className="w-1/3">
          <div className="flex items-center space-x-2">
            <span>TJM</span>
            <button
              className={`btn-outline btn-primary btn-sm btn-square btn`}
              onClick={resetTJM}
            >
              <Trash size={16} />
            </button>
          </div>
          <DoubleRangeInput
            className="mt-2 h-8 w-full"
            min={0}
            max={1000}
            step={50}
            onChange={changeTJM}
            value={filter.TJM}
          />
        </div>
        <div className="w-1/3">
          <div className="flex items-center space-x-2">
            <span>% Satisfaction</span>
            <button
              className={`btn-outline btn-primary btn-sm btn-square btn`}
              onClick={resetSatisfaction}
            >
              <Trash size={16} />
            </button>
          </div>
          <DoubleRangeInput
            className="mt-2 h-8 w-full"
            min={0}
            max={100}
            step={5}
            onChange={changeSatisfaction}
            value={filter.satisfaction}
          />
        </div>
      </div>
      <SearchPart title="Compétences">
        <div className="flex w-fit items-center gap-4">
          <div className="space-x-2">
            <button className="btn-xs btn" onClick={allSkills}>
              Tous
            </button>
            <button className="btn-xs btn" onClick={noSkills}>
              Aucun
            </button>
          </div>

          <div className="input input-sm flex items-center gap-2">
            {filter.skills.length ? (
              filter.skills.length == allComp.length ? (
                <span className="badge">Tous</span>
              ) : (
                filter.skills.map((s) => (
                  <span key={s} className="badge">
                    {s}
                  </span>
                ))
              )
            ) : (
              <span className="badge">Aucun</span>
            )}
            <DropdownCheck
              items={allComp.map((comp) => ({
                label: comp,
                value: comp,
                selected:
                  filter.skills.length != 0 &&
                  filter.skills.length != allComp.length
                    ? filter.skills.includes(comp)
                    : false,
              }))}
              onSubmit={changeSkills}
            />
          </div>
        </div>
      </SearchPart>
    </div>
  );
}

function SearchPart({
  title,
  children,
}: { title: string } & PropsWithChildren) {
  return (
    <div className="w-fit">
      <div className="mb-4 border-b border-base-300">{title}</div>
      {children}
    </div>
  );
}
