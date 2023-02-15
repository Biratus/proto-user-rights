import bcrypt from "bcrypt";
import { Utilisateur } from "./db/repository/UserRepository";

export async function randomPassword() {
  const pwd = generateRandomPassword();
  const hashedPwd = await bcrypt.hash(pwd, 10);
  return { clear: pwd, hashed: hashedPwd };
}
function generateRandomPassword(length: number = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
}

export async function userMatch(input: Utilisateur, userDB: Utilisateur) {
  if (input.username !== userDB.username) return false;

  return await bcrypt.compare(input.password!, userDB.password!);
}
