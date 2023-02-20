"use client";
import { useRef } from "react";
import {
  setUserManagementProps,
  UserManagementStoreProps,
} from "./userManagementStore";

export default function UserManagementInitializer(
  props: UserManagementStoreProps
) {
  const initilized = useRef(false);
  if (!initilized.current) {
    setUserManagementProps(props);
    initilized.current = true;
  }
  return null;
}
