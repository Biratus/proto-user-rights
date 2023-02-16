import {
  utilisateurs,
  utilisateur_droit,
  utilisateur_role,
} from "@prisma/client";
import { prisma } from "../prisma";

export interface Utilisateur {
  id?: number;
  username?: string;
  password?: string;
  type?: string;
  roles: string[];
  droits: string[];
}

const mapUserToDB = (user: Utilisateur) => ({
  droits: {
    createMany: { data: user.droits?.map((s) => ({ droit: s })) || [] },
  },
  roles: {
    createMany: { data: user.roles?.map((r) => ({ role: r })) || [] },
  },
});

const mapDBToUser = (
  user: utilisateurs & {
    droits: utilisateur_droit[];
    roles: utilisateur_role[];
  }
): Utilisateur => {
  return {
    id: user.id,
    username: user.username || undefined,
    password: user.password || undefined,
    type: user.type || undefined,
    roles: user.roles.map((r) => r.role),
    droits: user.droits.map((d) => d.droit),
  };
};

class UserRepository {
  static async create(user: Utilisateur) {
    return await prisma.utilisateurs.create({
      data: {
        ...user,
        ...mapUserToDB(user),
      },
    });
  }

  static async byUsername(username: string) {
    const user = await prisma.utilisateurs.findFirst({
      where: { username },
      include: {
        roles: true,
        droits: true,
      },
    });
    return user ? mapDBToUser(user) : null;
  }

  static async update(user: Utilisateur) {
    return await prisma.utilisateurs.update({
      where: { id: user.id },
      data: {
        ...user,
        ...mapUserToDB(user),
      },
    });
  }

  static async getAll() {
    return (
      await prisma.utilisateurs.findMany({
        include: {
          roles: true,
          droits: true,
        },
      })
    ).map(mapDBToUser);
  }
}

export default UserRepository;
