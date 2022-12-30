import { HttpException } from '../../../utils/error/ErrorHandle';
import { UserRepository } from '../../repositories/UserRepository';

export class DeleteUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    const checkExistingUser = await this.repository.read(id);

    if (!checkExistingUser) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    await this.repository.delete(id);
  }
}
