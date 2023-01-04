import { HttpException } from '../../../utils/error/ErrorHandle';
import { removeItem } from '../../../utils/helpers/removeItem';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class DeleteUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    const clientRepository = new ClientRepository();
    const checkExistingUser = await this.repository.read(id);
    const findUserInclient = await clientRepository.readByUserId(id);

    if (!checkExistingUser) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    findUserInclient.map(async client => {
      const userArray = client.user_id as Array<string>;
      const removeUser = removeItem(userArray, id);
      await clientRepository.removeUserId(client.id as string, removeUser);
    });

    await this.repository.delete(id);
  }
}
