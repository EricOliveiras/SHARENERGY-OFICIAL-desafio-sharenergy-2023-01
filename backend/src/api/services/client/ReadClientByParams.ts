import { ClientRepository } from '../../repositories/ClientRepository';

export class ReadClientByParams {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(user_id: string, params: string): Promise<object | []> {
    const clients = await this.repository.readByParams(user_id, params);

    return clients;
  }
}
