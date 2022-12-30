import { HttpException } from '../../../utils/error/ErrorHandle';
import { ClientRepository } from '../../repositories/ClientRepository';

export class DeleteClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(id: string, user_id: string): Promise<void> {
    const client = await this.repository.read(id, user_id);

    if (!client) {
      throw new HttpException(404, 'Client not found or does not exist');
    }

    await this.repository.delete(id);
  }
}
