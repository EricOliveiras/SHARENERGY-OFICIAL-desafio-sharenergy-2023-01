import { HttpException } from '../../../utils/error/ErrorHandle';
import { ClientRepository } from '../../repositories/ClientRepository';

export class ReadAllClients {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(user_id: string): Promise<object> {
    const clients = await this.repository.readByUserId(user_id);

    if (!clients) {
      throw new HttpException(404, 'Clients not found or does not exists');
    }

    return clients;
  }
}
