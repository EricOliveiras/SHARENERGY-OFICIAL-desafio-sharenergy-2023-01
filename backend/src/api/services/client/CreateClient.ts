import { HttpException } from '../../../utils/error/ErrorHandle';
import { IClient } from '../../../utils/interfaces/IClient';
import { ClientRepository } from '../../repositories/ClientRepository';

export class CreateClient {
  private repository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  async execute({ user_id, name, email, cpf, phone, address }: IClient): Promise<void> {
    const clientCpf = await this.repository.readByCpf(user_id, cpf);
    const clientEmail = await this.repository.readByEmail(user_id, email);

    if (clientCpf || clientEmail) {
      throw new HttpException(409, 'Client already exist');
    }

    await this.repository.create({
      user_id,
      name,
      email,
      cpf,
      phone,
      address
    });
  }
}
