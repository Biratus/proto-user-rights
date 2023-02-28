import { create, StoreApi, UseBoundStore } from "zustand";
import { Matcher } from "./Matcher";

export type SearchFormStore<D, F extends Object> = {
  data: D[];
  filter: F;
  filteredData: D[];
  setData: (newData: D[]) => void;
  setFilter: (newFilter: Partial<F>) => void;
  resetFilter: () => void;
  isEmpty: () => boolean;
};

type SearchStoreFilter<F extends Object> = {
  filter: F;
  setFilter: (newFilter: Partial<F>) => void;
  resetFilter: () => void;
  isEmpty: () => boolean;
};
type ZustandSearchStore<D, F extends Object> = UseBoundStore<
  StoreApi<SearchFormStore<D, F>>
>;

export const createSearchStore = <D, F extends Object>(
  data: D[],
  filter: F,
  matcher: Matcher<D, F>
): ZustandSearchStore<D, F> =>
  create<SearchFormStore<D, F>>((set, get) => ({
    data,
    filter,
    filteredData: applyFilter(data, filter, matcher),
    setData: (newData: D[]) =>
      set({
        data: newData,
        filteredData: applyFilter(newData, get().filter, matcher),
      }),
    setFilter: (newFilter: Partial<F>) =>
      set({
        filter: { ...get().filter, ...newFilter },
        filteredData: applyFilter(
          get().data,
          { ...get().filter, ...newFilter },
          matcher
        ),
      }),
    resetFilter: () =>
      set({
        filter,
        filteredData: applyFilter(get().data, filter, matcher),
      }),
    isEmpty: () => get().filter == filter,
  }));

export function useSearchStoreFilter<F extends Object>(
  store: ZustandSearchStore<any, F>
) {
  return {
    filter: store((s) => s.filter) as F,
    setFilter: store((s) => s.setFilter),
    resetFilter: store((s) => s.resetFilter),
    isEmpty: store((s) => s.isEmpty),
  } as SearchStoreFilter<F>;
}

function applyFilter<D, F extends Object>(
  datas: D[],
  filter: F,
  matcher: Matcher<D, F>
) {
  return datas.filter((data) => {
    for (let key in filter) {
      if (key in filter) {
        // Pour chaque filtre
        let match = matcher[key](data, filter[key]); // Match ?
        if (!match) return false;
      }
    }
    return true;
  });
}
