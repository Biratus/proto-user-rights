import { prisma } from "../prisma";
import { Utilisateur } from "./UserRepository";

class AuthRepository {
  static async getAllRoles() {
    return (await prisma.role.findMany()).map((r) => r.libelle);
  }
  static async getAllDroits() {
    return (await prisma.droits.findMany()).map((d) => d.nom);
  }

  static async updateRoles(user: Utilisateur, roles: string[]) {
    try {
      await prisma.utilisateur_role.deleteMany({
        where: { id_utilisateur: user.id },
      });

      if (roles.length > 0)
        await prisma.utilisateur_role.createMany({
          data: roles.map((r) => ({ id_utilisateur: user.id, role: r })),
        });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateDroits(user: Utilisateur, droits: string[]) {
    try {
      await prisma.utilisateur_droit.deleteMany({
        where: { id_utilisateur: user.id },
      });

      if (droits.length > 0)
        await prisma.utilisateur_droit.createMany({
          data: droits.map((d) => ({ id_utilisateur: user.id, droit: d })),
        });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default AuthRepository;
