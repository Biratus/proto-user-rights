import { UtilisateurWithRights } from "@/lib/db/repository/UserRepository";
import { includesIgnoreCase } from "@/lib/strings";
import { create } from "zustand";

export type UserManagementStoreProps = {
  users: UtilisateurWithRights[];
  droits: string[];
  roles: string[];
};

const initialProps: UserManagementStoreProps = {
  users: [],
  droits: [],
  roles: [],
};

type UserManagementFilter = {
  username: string;
  userType: string;
};

type UserManagementStore = UserManagementStoreProps & {
  filter: UserManagementFilter;
  filteredUsers: UtilisateurWithRights[];
};

const initialFilter: UserManagementFilter = {
  username: "",
  userType: "",
};
const userManagementStore = create<UserManagementStore>((set, get) => ({
  ...initialProps,
  filter: initialFilter,
  filteredUsers: [...initialProps.users],
}));

export const setUserManagementProps = (props: UserManagementStoreProps) =>
  userManagementStore.setState({ ...props, filteredUsers: [...props.users] });

// export const useUserManagementMatch = () =>
//   userManagementStore((state) => state.userMatch);

export const useFilteredUsers = () =>
  userManagementStore((state) => state.filteredUsers);

export const useUserManagementFilter = () => ({
  filter: userManagementStore((state) => state.filter),
  setFilter: (filter: Partial<UserManagementFilter>) =>
    userManagementStore.setState((state) => ({
      filter: { ...state.filter, ...filter },
      filteredUsers: state.users.filter((user) =>
        userMatch(user, { ...state.filter, ...filter })
      ),
    })),
  resetFilter: () =>
    userManagementStore.setState((state) => ({
      filter: initialFilter,
      filteredUsers: state.users,
    })),
});

function userMatch(user: UtilisateurWithRights, filter: UserManagementFilter) {
  let usernameMatch =
    filter.username == "" ||
    ((filter.username &&
      includesIgnoreCase(user.username!, filter.username)) as boolean);

  let userTypeMatch =
    filter.userType == "" ||
    ((filter.userType && filter.userType == user.type) as boolean);
  return usernameMatch && userTypeMatch;
}
