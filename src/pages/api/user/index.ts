import { hashPassword } from "@/lib/auth";
import UserRepository, {
  Utilisateur,
} from "@/lib/db/repository/UserRepository";
import { NextApiRequest, NextApiResponse } from "next";
import { isPut, notMapped, ok, serverError } from "../../../lib/http/backend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (isPut(req)) {
    const user = req.body as Utilisateur;
    user.password = await hashPassword(user.password!);
    try {
      await UserRepository.update(user);
      return ok(res, {});
    } catch (e) {
      console.error(e);
      return serverError(res, "CHANGEMENT DE MOT DE PASSE");
    }
  } else return notMapped(res);
}
