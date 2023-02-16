import axios from "axios";
import { Utilisateur } from "./db/repository/UserRepository";

type UpdateResponse = {
  status: boolean;
  message?: any;
};

export async function registerUser(username: string) {
  return (await axios.post("/api/auth/register", { username }))
    .data as Utilisateur;
}

export async function updateUserPassword(
  user: Utilisateur
): Promise<UpdateResponse> {
  try {
    const res = await axios.put("/api/user", user);
    return { status: res.status == 200 };
  } catch (e: any) {
    return { status: false, message: e.response.data.message };
  }
}

export async function updateUserRoles(
  user: Utilisateur,
  roles: string[]
): Promise<UpdateResponse> {
  try {
    const res = await axios.put("/api/auth/user-management", { user, roles });
    return { status: res.status == 200 };
  } catch (e: any) {
    return { status: false, message: e.response.data.message };
  }
}

export async function updateUserDroits(
  user: Utilisateur,
  droits: string[]
): Promise<UpdateResponse> {
  try {
    const res = await axios.put("/api/auth/user-management", { user, droits });
    return { status: res.status == 200 };
  } catch (e: any) {
    return { status: false, message: e.response.data.message };
  }
}
