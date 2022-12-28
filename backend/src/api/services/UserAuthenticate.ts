import { compareSync } from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { HttpException } from '../../utils/error/ErrorHandle';

export class UserAuthenticate {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string): Promise<object> {
    const user = await this.repository.readByEmail(email);

    if (!user || !compareSync(password, user.password)) {
      throw new HttpException(401, 'Email or password incorrect');
    }

    const id = user.id;

    return { id: id };
  }
}
