"use client";

import BooleanSelect from "@/components/BooleanSelect";
import DoubleRangeInput from "@/components/DoubleRangeInput";
import DropdownSelect from "@/components/DropdownSelect";
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
    (interne?: boolean) => setFilter({ interne }),
    [setFilter]
  );

  const changeBlacklist = useCallback(
    (blacklist?: boolean) => setFilter({ blacklist }),
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
          className={`btn-outline btn-primary btn-square btn-sm btn ${
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
          <BooleanSelect
            className="w-auto"
            label="Interne/Externe"
            value={filter.interne}
            values={["Interne", "Externe"]}
            onChange={changeIntExt}
            onReset={changeIntExt}
          />
          <div className="divider divider-horizontal"></div>
          <BooleanSelect
            className="w-auto"
            label="Blacklisté ?"
            value={filter.blacklist}
            values={["Blacklisté", "Non blacklisté"]}
            onChange={changeBlacklist}
            onReset={changeBlacklist}
          />
        </div>
      </SearchPart>
      <div className="flex flex-row space-x-5">
        <div className="w-1/3">
          <div className="flex items-center space-x-2 border-b border-base-300 pb-2">
            <span>TJM</span>
            <button
              className={`btn-outline btn-primary btn-xs btn`}
              onClick={resetTJM}
            >
              max
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
        <div className="divider divider-vertical"></div>
        <div className="w-1/3">
          <div className="flex items-center space-x-2 border-b border-base-300 pb-2">
            <span>% Satisfaction</span>
            <button
              className={`btn-outline btn-primary btn-xs btn`}
              onClick={resetSatisfaction}
            >
              max
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
        <DropdownSelect
          items={allComp}
          selected={filter.skills}
          onChange={changeSkills}
        />
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
