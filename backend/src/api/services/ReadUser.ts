import { HttpException } from '../../utils/error/ErrorHandle';
import { UserRepository } from '../repositories/UserRepository';

export class ReadUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<object> {
    const checkExistingUser = await this.repository.read(id);

    if (!checkExistingUser) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    return checkExistingUser;
  }
}
