import { HttpException } from '../../../utils/error/ErrorHandle';
import { IClient } from '../../../utils/interfaces/IClient';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class CreateClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute({ user_id, name, email, cpf, phone, address }: IClient): Promise<void> {
    const userRepository =  new UserRepository();
    const client = await this.repository.readCpf(cpf);
    const clientExist = await this.repository.readByCpf(user_id, cpf);
    const clientId = client?.id as string;

    if (clientExist) {
      throw new HttpException(409, 'Client already exist');
    }

    if (client) {
      await this.repository.addUserId(clientId, user_id);
      await userRepository.addClientId(user_id, clientId);
      return;
    } else {
      const createClient = await this.repository.create({
        user_id,
        name,
        email,
        cpf,
        phone,
        address
      });

      await userRepository.addClientId(user_id, createClient.id);

    }

  }
}
