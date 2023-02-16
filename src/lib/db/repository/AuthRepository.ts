import { prisma } from "../prisma";

class AuthRepository {
  static async getAllRoles() {
    return (await prisma.role.findMany()).map((r) => r.libelle);
  }
  static async getAllDroits() {
    return (await prisma.droits.findMany()).map((d) => d.nom);
  }
}

export default AuthRepository;
