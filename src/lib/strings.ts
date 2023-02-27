export function upperFirst(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}

export function includesIgnoreCase(str: string, search: string) {
  return str.toLowerCase().includes(search.toLowerCase());
}

export function strMatchList(search: string, strs: string[]) {
  return strs.some((s) => includesIgnoreCase(s, search));
}
