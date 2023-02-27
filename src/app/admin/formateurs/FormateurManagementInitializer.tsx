"use client";
import { useRef } from "react";
import {
  FormateurManagementStoreProps,
  setFormateurManagementProps,
} from "./formateurManagementStore";

export default function FormateurMangementInitializer(
  props: FormateurManagementStoreProps
) {
  const initilized = useRef(false);
  if (!initilized.current) {
    setFormateurManagementProps(props);
    initilized.current = true;
  }
  return null;
}
