import { Module } from "@/lib/types";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { isPut, ok, requestError } from "../../../lib/http/backend";
import { formateurs as formateurReal, modules } from "../../../lib/realData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (isPut(req)) {
    let modId = req.query.id;
    const { split, formateurs } = req.body;
    console.log({ split });
    const splitDate = parseISO(split);

    let mod;
    let modIndex: number;

    for (let i in modules) {
      let { id } = modules[i];
      if (id == modId) {
        mod = modules[i];
        modIndex = +i;
      }
    }

    // Check module
    if (!mod) {
      return requestError(res, `Pas de module avec id [${modId}]`);
    }

    // Check formateur
    for (let f of formateurs) {
      if (!formateurReal.hasOwnProperty(f.mail))
        return requestError(res, `Pas de formateur avec mail [${f.mail}]`);
    }

    // Check date;
    if (
      !isWithinInterval(split, {
        start: mod.start,
        end: mod.end,
      })
    ) {
      return requestError(
        res,
        "La date de coupure est en dehors des dates du module"
      );
    }

    console.log("TOUT est ok");

    // Split
    let m1: Module = { ...mod };
    let m2: Module = { ...mod };

    m1.end = splitDate;
    m2.start = addDays(splitDate, 1);
    m1.formateur = formateurReal.get(formateurs[0].mail)!;
    m2.formateur = formateurReal.get(formateurs[1].mail)!;
    m2.id = uuidv4();

    modules.splice(modIndex!, 1);

    modules.push(m1);
    modules.push(m2);

    console.log("created", [m1, m2]);

    return ok(res, null);
  }
}
