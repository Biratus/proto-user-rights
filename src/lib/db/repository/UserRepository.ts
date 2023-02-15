import { prisma } from "../prisma";

interface Utilisateur {
  id?: number;
  username?: string;
  password?: string;
  type?: string;
}

class UserRepository {
  static async create(user: Utilisateur) {
    return await prisma.utilisateurs.create({ data: user });
  }
}

export default UserRepository;
