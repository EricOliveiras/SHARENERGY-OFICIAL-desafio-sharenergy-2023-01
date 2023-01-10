import { prismaService as db } from '../../utils/prisma';
import { IClient, IClientUpdate } from '../../utils/interfaces/IClient';

export class ClientRepository {
  async create(client: IClient) {
    const createClient = await db.client.create({
      data: client
    });

    return createClient;
  }

  async read(id: string, user_id: string) {
    const client = await db.client.findFirst({
      where: {
        AND: [
          {
            user_id: {
              has: user_id
            }
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

  async readByParams(user_id: string, param: string) {
    const client = await db.client.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                name: {
                  startsWith: param
                }
              },
              {
                user_id: {
                  has: user_id
                }
              }
            ]
          },
          {
            AND: [
              {
                cpf: {
                  startsWith: param
                }
              },
              {
                user_id: {
                  has: user_id
                }
              }
            ]
          },
          {
            AND: [
              {
                email: {
                  startsWith: param
                }
              },
              {
                user_id: {
                  has: user_id
                }
              }
            ]
          }
        ],
      }
    });

    return client;
  }

  async readCpf(cpf: string) {
    const client = await db.client.findUnique({
      where: {
        cpf: cpf
      },
    });

    return client;
  }

  async readEmail(email: string) {
    const client = await db.client.findUnique({
      where: {
        email: email
      },
    });

    return client;
  }

  async readByEmail(user_id: string, email: string) {
    const client = await db.client.findFirst({
      where: {
        AND: [
          {
            user_id: {
              has: user_id
            }
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
            user_id: {
              has: user_id
            }
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
        user_id: {
          has: user_id
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
        user_id: true,
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
            user_id: {
              has: user_id
            }
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

  async addUserId(id: string, user_id: string | string[]) {
    const add = await db.client.update({
      where: {
        id: id
      },
      data: {
        user_id: {
          push: user_id
        }
      }
    });

    return add;
  }

  async removeUserId(id: string, user_id: string | string[]) {
    await db.client.update({
      where: {
        id: id
      },
      data: {
        user_id: {
          set: user_id || []
        }
      }
    });
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
