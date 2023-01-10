import { hash } from 'bcrypt';
import { HttpException } from '../../../utils/error/ErrorHandle';
import { IUser } from '../../../utils/interfaces/IUser';
import { UserRepository } from '../../repositories/UserRepository';

export class CreateUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute({ username, email, password }: IUser): Promise<IUser> {
    const checkExistingUser = await this.repository.readByEmail(email);
    const checkExistingUsername = await this.repository.readByUsername(username);

    if (checkExistingUser || checkExistingUsername) {
      throw new HttpException(409, 'User already exist');
    }

    const hashPassword = await hash(password, 10);

    const user = await this.repository.create({
      username,
      email,
      password: hashPassword,
      client_id: []
    });

    return user;
  }
}
