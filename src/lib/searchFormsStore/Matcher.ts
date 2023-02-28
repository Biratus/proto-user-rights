export type Matcher<D, F extends Object> = {
  [K in keyof F]: (data: D, value: F[K]) => boolean;
};

export const MatcherFactory = {
  string: includesIgnoreCase,
  strings: (search: string, against: string[]) =>
    against.some((s) => includesIgnoreCase(search, s)),
  range: (search: number[], against: number) =>
    against > search[0] && against < search[1],
  boolean: (search: boolean | undefined, against: boolean) =>
    search == undefined || against === search,
  stringLists: stringListMatch,
};

function includesIgnoreCase(search: string, against: string) {
  return against.toLowerCase().includes(search.toLowerCase());
}

function stringListMatch(
  search: string[],
  against: string[],
  allValueLength: number
) {
  // Tous
  if (search.length == allValueLength) return true;

  // Aucun
  if (search.length == 0) return against.length == 0;

  // Some
  if (search.every((elt) => against.includes(elt))) return true;

  return false;
}

function testMatchers() {
  let match = MatcherFactory.strings("", ["lol", "lil"]);
  console.assert(match, "MatcherFactory fail");
}

// testMatchers();
