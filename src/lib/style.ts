import { Style } from "./types";

export function createStyle(className: string, props = {}): Style {
  return { className, props };
}

export function emptyStyle() {
  return createStyle("");
}
