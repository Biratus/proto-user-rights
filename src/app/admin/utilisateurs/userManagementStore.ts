import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import { Matcher, MatcherFactory } from "@/lib/searchFormsStore/Matcher";
import {
  createSearchStore,
  useSearchStoreFilter,
} from "@/lib/searchFormsStore/SearchFormStore";

export type UserManagementStoreProps = {
  users: UtilisateurWithRights[];
};

type UserManagementFilter = {
  username: string;
  userType: string;
};

const initialFilter: UserManagementFilter = {
  username: "",
  userType: "",
};

const userMatcher: Matcher<UtilisateurWithRights, UserManagementFilter> = {
  username: ({ username }: UtilisateurWithRights, filterUsername: string) =>
    MatcherFactory.string(filterUsername, username!),
  userType: ({ type }: UtilisateurWithRights, filterType: string) =>
    filterType == "" || filterType == type,
};

const userManagementStore = createSearchStore([], initialFilter, userMatcher);

export const setUserManagementProps = (props: UserManagementStoreProps) =>
  userManagementStore.getState().setData(props.users);

export const useFilteredUsers = () =>
  userManagementStore((state) => state.filteredData);

export const useUserManagementFilter = () =>
  useSearchStoreFilter<UserManagementFilter>(userManagementStore);
