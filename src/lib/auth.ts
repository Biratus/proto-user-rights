import bcrypt from "bcryptjs";
import UserRepository from "./db/repository/UserRepository";

export async function randomPassword() {
  const pwd = generateRandomPassword();
  const hashedPwd = await hashPassword(pwd);
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

export async function hashPassword(pwd: string) {
  return bcrypt.hash(pwd, 10);
}

export async function userMatch(
  input: { username: string; password: string },
  userDB: { username?: string; password?: string }
) {
  if (input.username !== userDB.username) return false;

  return await bcrypt.compare(input.password!, userDB.password!);
}

export async function authenticate(
  credentials:
    | {
        username: string;
        password: string;
      }
    | undefined
) {
  if (!credentials) return null;
  const user = await UserRepository.byUsername(credentials.username);
  console.log("auth", user);
  return user !== null && (await userMatch(credentials, user)) ? user : null;
}
