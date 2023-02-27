"use client";

import DropdownCheck from "@/components/DropdownCheck";
import { allComp } from "@/lib/realData";
import { Formateur } from "@/lib/types";
import { useCallback, useState } from "react";
import { getFormateurManagementFilter } from "./formateurManagementStore";

export default function FormateurManagementRow({
  formateur: originalFormateur,
}: {
  formateur: Formateur;
}) {
  const [formateur, setFormateur] = useState(originalFormateur);

  const { skills: selectedSkills } = getFormateurManagementFilter();

  const updateComp = useCallback((newSkills: string[]) => {
    setFormateur((f) => ({ ...f, skills: [...newSkills] }));
  }, []);
  return (
    <tr>
      <td
        className={`${formateur.interne ? "text-red-500" : "text-green-500"}`}
      >
        {formateur.interne ? "Interne" : "Externe"}
      </td>
      <InfoCell {...{ ...formateur, tel: "0606040405" }} />
      <td>Formateur</td>
      <td>
        <div className={`wrap flex items-center gap-2`}>
          <CompList
            items={formateur.skills}
            selected={
              selectedSkills.length == allComp.length ? [] : selectedSkills
            }
          />
          <DropdownCheck
            size="sm"
            items={allComp.map((comp) => ({
              label: comp,
              value: comp,
              selected: formateur.skills.includes(comp),
            }))}
            onSubmit={updateComp}
          />
        </div>
      </td>
      <td>{formateur.TJM.toFixed(2)}</td>
      <td>{formateur.satisfaction.toFixed(2)}%</td>
    </tr>
  );
}

function InfoCell({
  nom,
  prenom,
  mail,
  tel,
  blacklist,
}: Formateur & { tel: string }) {
  return (
    <td>
      <div
        className={`flex flex-col text-left ${
          blacklist ? "tooltip tooltip-right text-error" : ""
        }`}
        {...(blacklist ? { "data-tip": "Blacklisté" } : {})}
      >
        <span className="font-bold">
          {nom} {prenom}
        </span>
        <span className="text-sm">{mail}</span>
        <span className="text-sm">{tel}</span>
      </div>
    </td>
  );
}

function CompList({
  items,
  selected,
}: {
  items: string[];
  selected: string[];
}) {
  if (items.length == 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((label, i) => (
        <div
          key={i}
          className={`badge badge-md ${
            selected.includes(label)
              ? "badge-success -order-1"
              : "badge-primary"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
