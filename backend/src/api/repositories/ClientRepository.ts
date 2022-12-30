import { prismaService as db } from '../../utils/prisma';
import { IClient, IClientUpdate } from '../../utils/interfaces/IClient';

export class ClientRepository {
  async create(client: IClient) {
    await db.client.create({
      data: client
    });
  }

  async read(id: string, user_id: string) {
    const client = await db.client.findFirst({
      where: {
        AND: [
          {
            user_id: user_id
          },
          {
            id: {
              equals: id
            }
          }
        ]
      },
    });

    return client;
  }

  async readByEmail(user_id: string, email: string) {
    const client = await db.client.findFirst({
      where: {
        AND: [
          {
            user_id: user_id
          },
          {
            email: {
              equals: email
            }
          }
        ]
      },
    });

    return client;
  }

  async readByCpf(user_id: string, cpf: string) {
    const client = await db.client.findFirst({
      where: {
        AND: [
          {
            user_id: user_id
          },
          {
            cpf: {
              equals: cpf
            }
          }
        ],
      },
    });

    return client;
  }

  async readByUserId(user_id: string) {
    const client = await db.client.findMany({
      where: {
        user_id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
        created_at: true,
        updated_at: true
      }
    });

    return client;
  }

  async readByName(user_id: string, name: string) {
    const client = await db.client.findMany({
      where: {
        AND: [
          {
            name: {
              contains: name
            }
          },
          {
            user_id: user_id
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
        created_at: true,
        updated_at: true
      }
    });

    return client;
  }

  async update(id: string, client: IClientUpdate) {
    await db.client.update({
      where: {
        id: id
      },
      data: client
    });
  }

  async delete(id: string) {
    await db.client.delete({
      where: {
        id: id
      }
    });
  }
}
