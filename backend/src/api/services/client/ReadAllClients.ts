import { ClientRepository } from '../../repositories/ClientRepository';

export class ReadAllClients {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(user_id: string): Promise<object | []> {
    const clients = await this.repository.readByUserId(user_id);

    return clients;
  }
}
