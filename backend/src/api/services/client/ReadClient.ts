import { HttpException } from '../../../utils/error/ErrorHandle';
import { ClientRepository } from '../../repositories/ClientRepository';

export class ReadClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(id: string, user_id: string): Promise<object> {
    const client = await this.repository.read(id, user_id);

    if (!client) {
      throw new HttpException(404, 'Client not found or does not exist');
    }

    return client;
  }
}
