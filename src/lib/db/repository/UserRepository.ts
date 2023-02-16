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

  static async byUsername(username: string) {
    return await prisma.utilisateurs.findFirst({
      where: { username },
    });
  }

  static async update(user: Utilisateur) {
    return await prisma.utilisateurs.update({
      where: { id: user.id },
      data: user,
    });
  }
}

export default UserRepository;
