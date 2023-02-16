// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserRepository from "@/lib/db/repository/UserRepository";
import { ok, serverError } from "@/lib/http/backend";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dbResponse = await UserRepository.create({
    username: "john",
    password: "doe",
    type: "Lol",
  });
  if (dbResponse) {
    ok(res, dbResponse);
  } else serverError(res, "DB ERROR");
  // res.status(200).json({ name: 'John Doe' })
}
