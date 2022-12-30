import { HttpException } from '../../../utils/error/ErrorHandle';
import { IClientUpdate } from '../../../utils/interfaces/IClient';
import { ClientRepository } from '../../repositories/ClientRepository';

export class UpdateClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute(id: string, user_id: string, { name, email, cpf, address, phone }: IClientUpdate): Promise<void> {
    const checkExistingUser = await this.repository.read(id, user_id);

    if (!checkExistingUser) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    await this.repository.update(id, {
      name,
      email,
      cpf,
      address,
      phone
    });
  }
}