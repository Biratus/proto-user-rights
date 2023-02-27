import { allComp, formateurs } from "@/lib/realData";
import { strMatchList } from "@/lib/strings";
import { Formateur } from "@/lib/types";
import { create } from "zustand";

export type FormateurManagementStoreProps = {
  formateurs: Formateur[];
};

const initialProps: FormateurManagementStoreProps = {
  formateurs: Array.from(formateurs.values()),
};

type FormateurManagementFilter = {
  infos: string;
  TJM: number[];
  satisfaction: number[];
  skills: string[];
  interne?: boolean;
  blacklist?: boolean;
};

type FormateurManagementStore = FormateurManagementStoreProps & {
  filter: FormateurManagementFilter;
  filteredFormateurs: Formateur[];
};

const initialFilter = {
  infos: "",
  TJM: [0, 999],
  satisfaction: [0, 100],
  skills: allComp,
  blacklist: false,
};

const formateurManagementStore = create<FormateurManagementStore>(
  (set, get) => ({
    ...initialProps,
    filter: initialFilter,
    filteredFormateurs: [
      ...initialProps.formateurs.filter((formateur) =>
        formateurMatch(formateur, initialFilter)
      ),
    ],
  })
);

export const setFormateurManagementProps = (
  props: FormateurManagementStoreProps
) =>
  formateurManagementStore.setState({
    ...props,
    filteredFormateurs: [
      ...props.formateurs.filter((formateur) =>
        formateurMatch(formateur, initialFilter)
      ),
    ],
  });

export const useFilteredFormateurs = () =>
  formateurManagementStore((state) => state.filteredFormateurs);
export const getFormateurManagementFilter = () =>
  formateurManagementStore((state) => state.filter);

export const useFormateurManagementFilter = () => ({
  filter: getFormateurManagementFilter(),
  setFilter: (filter: Partial<FormateurManagementFilter>) =>
    formateurManagementStore.setState((state) => ({
      filter: { ...state.filter, ...filter },
      filteredFormateurs: state.formateurs.filter((formateur) =>
        formateurMatch(formateur, { ...state.filter, ...filter })
      ),
    })),
  resetFilter: () =>
    formateurManagementStore.setState((state) => ({
      filter: initialFilter,
      filteredFormateurs: state.formateurs,
    })),
  isEmpty: () => formateurManagementStore.getState().filter == initialFilter,
});

function formateurMatch(
  {
    nom,
    prenom,
    mail,
    TJM,
    satisfaction,
    skills,
    interne,
    blacklist,
  }: Formateur,
  filter: FormateurManagementFilter
) {
  let infosMatch = strMatchList(filter.infos, [nom, prenom, mail]);

  let tjmMatch = TJM >= filter.TJM[0] && TJM <= filter.TJM[1];
  let satisfactionMatch =
    satisfaction >= filter.satisfaction[0] &&
    satisfaction <= filter.satisfaction[1];

  let intExtMatch = filter.interne === undefined || interne === filter.interne;

  let blacklistMatch =
    filter.blacklist === undefined || blacklist === filter.blacklist;
  let sk = skillMatch(filter.skills, skills);
  console.log({ mail, skills, sk });
  return (
    infosMatch &&
    tjmMatch &&
    satisfactionMatch &&
    intExtMatch &&
    blacklistMatch &&
    sk
  );
}

function skillMatch(search: string[], against: string[]) {
  // Tous
  if (search.length == allComp.length) return true;

  // Aucun
  if (search.length == 0) return against.length == 0;

  // Some
  if (search.every((elt) => against.includes(elt))) return true;

  return false;
}
