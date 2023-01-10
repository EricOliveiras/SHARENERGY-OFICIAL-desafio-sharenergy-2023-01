import { prismaService as db } from '../../utils/prisma';
import { IUser, IUserUpdate } from '../../utils/interfaces/IUser';

export class UserRepository {
  async create(user: IUser) {
    const createUser =  await db.user.create({
      data: user
    });

    return createUser;
  }

  async read(id: string) {
    const user = await db.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        username: true,
        email: true,
        client_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async readByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email: email
      },
    });

    return user;
  }

  async readByUsername(username: string) {
    const user = await db.user.findUnique({
      where: {
        username: username
      },
    });

    return user;
  }

  async addClientId(id: string, client_id: string | string[]) {
    await db.user.update({
      where: {
        id: id
      },
      data: {
        client_id: {
          push: client_id
        }
      }
    });
  }

  async removeClientId(id: string, client_id: string | string[]) {
    await db.user.update({
      where: {
        id: id
      },
      data: {
        client_id: {
          set: client_id || []
        }
      }
    });
  }

  async update(id: string, user: IUserUpdate) {
    await db.user.update({
      where: {
        id: id
      },
      data: user
    });
  }

  async delete(id: string) {
    await db.user.delete({
      where: {
        id: id
      }
    });
  }
}
