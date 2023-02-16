import axios from "axios";
import { Utilisateur } from "./db/repository/UserRepository";
import { Formateur, Module } from "./types";

type UpdateResponse = {
  status: boolean;
  message?: any;
};

export async function switchFormateur(newModule: Module) {
  try {
    const response = await axios.put("/api/modules", newModule);
    return true;
  } catch (e) {
    return false;
  }
}

// TODO !!!!
export async function splitModule({
  split,
  formateurs,
}: {
  split: any;
  formateurs: Formateur[];
}) {
  //   try {
  //     await axios.put("/api/modules/" + hoverProps.module.id, {
  //       split,
  //       formateurs: formateurs.map((f) => {
  //         return { mail: f.id };
  //       }),
  //     });
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
}

export async function fetchMods(): Promise<Module[]> {
  const modResp = await axios.get("/api/modules");
  return modResp.data as Module[];
}

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
  } catch (e) {
    console.error(e);
    return { status: false, message: e };
  }
}
