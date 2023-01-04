import { HttpException } from '../../../utils/error/ErrorHandle';
import { removeItem } from '../../../utils/helpers/removeItem';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class DeleteClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(id: string, user_id: string): Promise<void> {
    const userRepository = new UserRepository();
    const user = await userRepository.read(user_id);
    const clientArray = user?.client_id as Array<string>;
    const client = await this.repository.read(id, user_id);
    const userArray = client?.user_id as Array<string>;

    if (!client) {
      throw new HttpException(404, 'Client not found or does not exist');
    }

    const newArrayClients = removeItem(clientArray, id);
    const newArrayUsers = removeItem(userArray, user_id);

    await this.repository.removeUserId(id, newArrayUsers);
    await userRepository.removeClientId(user_id, newArrayClients);
  }
}
