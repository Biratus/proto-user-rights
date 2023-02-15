import { prisma } from "../prisma";

export interface Utilisateur {
  id?: number;
  username?: string;
  password?: string;
  type?: string;
}

class UserRepository {
  static async create(user: Utilisateur) {
    return await prisma.utilisateurs.create({ data: user });
  }
  static async forAuth({ username, password }: Utilisateur) {
    return await prisma.utilisateurs.findFirst({
      where: { username, password },
    });
  }
}

export default UserRepository;
