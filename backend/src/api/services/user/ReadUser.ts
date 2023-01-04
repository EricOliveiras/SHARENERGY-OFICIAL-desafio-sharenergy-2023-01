import { HttpException } from '../../../utils/error/ErrorHandle';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class ReadUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<object> {
    const clientRepository = new ClientRepository();
    const clients = await clientRepository.readByUserId(id);
    const user = await this.repository.read(id);

    if (!user) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    return {
      user,
      clients
    };
  }
}
