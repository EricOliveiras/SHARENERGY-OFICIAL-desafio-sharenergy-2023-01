import { prismaService as db } from '../../utils/prisma';
import { IUser, IUserUpdate } from '../../utils/interfaces/IUser';

export class UserRepository {
  async create(user: IUser) {
    await db.user.create({
      data: user
    });
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
        created_at: true,
        updated_at: true
      }
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
