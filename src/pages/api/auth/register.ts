// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isPost, notFound, ok, requestError, serverError } from "@/lib/api";
import { randomPassword } from "@/lib/auth";
import UserRepository, {
  Utilisateur,
} from "@/lib/db/repository/UserRepository";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Utilisateur>
) {
  if (!isPost(req)) return notFound(res, "URL Not Mapped");
  const { username } = req.body;
  if (!username) {
    return requestError(res, "Username is not defined");
  }
  const { clear, hashed } = await randomPassword();
  const dbResponse = await UserRepository.create({
    username,
    password: hashed,
    type: "Lol",
  });

  if (dbResponse) {
    ok(res, { username, password: clear });
  } else serverError(res, "DB ERROR");
  // res.status(200).json({ name: 'John Doe' })
}
