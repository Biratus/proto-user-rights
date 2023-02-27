"use client";

import FormateurManagementRow from "./FormateurManagementRow";
import { useFilteredFormateurs } from "./formateurManagementStore";

export default function FormateurManagementTable() {
  const formateurs = useFilteredFormateurs();
  console.log({ formateurs });
  return (
    <table className="table-zebra -z-10 m-1 table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Informations</th>
          <th>Titre</th>
          <th>Compétences</th>
          <th>TJM</th>
          <th>% satisfaction</th>
        </tr>
      </thead>
      <tbody>
        {formateurs.map((f, index) => (
          <FormateurManagementRow key={f.mail} formateur={f} />
        ))}
      </tbody>
    </table>
  );
}
