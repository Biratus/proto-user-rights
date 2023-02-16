import AuthRepository from "@/lib/db/repository/AuthRepository";
import {
  isPut,
  notMapped,
  ok,
  requestError,
  serverError,
} from "@/lib/http/backend";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (isPut(req)) {
    if (!req.body.user)
      return requestError(res, "Il faut fournir un utilisateur.");
    else if (!req.body.droits && !req.body.roles)
      return requestError(
        res,
        "Il faut fournir soit une liste de droits, soit une liste de roles à mettre à jour."
      );

    const { user } = req.body;
    if (req.body.droits) {
      const success = await AuthRepository.updateDroits(user, req.body.droits);
      if (success) return ok(res, {});
      else return serverError(res, "MODIFICATION DES DROITS");
    } else if (req.body.roles) {
      const success = await AuthRepository.updateRoles(user, req.body.roles);
      if (success) return ok(res, {});
      else return serverError(res, "MODIFICATION DES ROLES");
    }
  }
  return notMapped(res);
}
