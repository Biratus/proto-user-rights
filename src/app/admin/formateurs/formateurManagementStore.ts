import { allComp, formateurs } from "@/lib/realData";
import { Matcher, MatcherFactory } from "@/lib/searchFormsStore/Matcher";
import {
  createSearchStore,
  useSearchStoreFilter,
} from "@/lib/searchFormsStore/SearchFormStore";
import { Formateur } from "@/lib/types";

export type FormateurManagementStoreProps = {
  formateurs: Formateur[];
};

type FormateurManagementFilter = {
  infos: string;
  TJM: number[];
  satisfaction: number[];
  skills: string[];
  interne?: boolean;
};

const initialFilter: FormateurManagementFilter = {
  infos: "",
  TJM: [0, 999],
  satisfaction: [0, 100],
  skills: allComp,
};

const formateurMatcher: Matcher<Formateur, FormateurManagementFilter> = {
  infos: ({ nom, prenom, mail }: Formateur, filterInfos: string) =>
    MatcherFactory.strings(filterInfos, [nom, prenom, mail]),
  TJM: ({ TJM }: Formateur, filterTJM: number[]) =>
    MatcherFactory.range(filterTJM, TJM),
  satisfaction: ({ satisfaction }: Formateur, filterSatisfaction: number[]) =>
    MatcherFactory.range(filterSatisfaction, satisfaction),
  skills: ({ skills }: Formateur, filterSkills: string[]) =>
    MatcherFactory.stringLists(filterSkills, skills, allComp.length),
  interne: ({ interne }: Formateur, filterInterne: boolean | undefined) =>
    MatcherFactory.boolean(filterInterne, interne),
};

const formateurManagementStore = createSearchStore(
  Array.from(formateurs.values()),
  initialFilter,
  formateurMatcher
);

export const setFormateurManagementProps = (
  props: FormateurManagementStoreProps
) => formateurManagementStore.getState().setData(props.formateurs);

export const useFilteredFormateurs = () =>
  formateurManagementStore((state) => state.filteredData);

export const getFormateurManagementFilter = () =>
  formateurManagementStore((state) => state.filter);

export const useFormateurManagementFilter = () =>
  useSearchStoreFilter<FormateurManagementFilter>(formateurManagementStore);
