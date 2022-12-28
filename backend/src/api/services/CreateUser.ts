import { hash } from 'bcrypt';
import { HttpException } from '../../utils/error/ErrorHandle';
import { IUser } from '../../utils/interfaces/IUser';
import { UserRepository } from '../repositories/UserRepository';

export class CreateUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute({ username, email, password }: IUser): Promise<void> {
    const checkExistingUser = await this.repository.readByEmail(email);

    if (checkExistingUser) {
      throw new HttpException(409, 'User already exist');
    }

    const hashPassword = await hash(password, 10);

    await this.repository.create({
      username,
      email,
      password: hashPassword
    });
  }
}
