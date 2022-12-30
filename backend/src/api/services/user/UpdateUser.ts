import { HttpException } from '../../../utils/error/ErrorHandle';
import { UserRepository } from '../../repositories/UserRepository';
import { IUserUpdate } from '../../../utils/interfaces/IUser';
import { hash } from 'bcrypt';

export class UpdateUser {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string, { username, email, password }: IUserUpdate): Promise<void> {
    const checkExistingUser = await this.repository.read(id);
    const checkUsername = username ? await this.repository.readByUsername(username as string) : null;
    const checkEmail = email ? await this.repository.readByEmail(email as string) : null;

    if (!checkExistingUser) {
      throw new HttpException(404, 'User not found or does not exist');
    }

    if (checkUsername || checkEmail) {
      throw new HttpException(409, 'email or username already existis');
    }

    let newPassword = password;

    if (newPassword) {
      newPassword = await hash(newPassword, 10);
    }

    await this.repository.update(id, {
      username,
      email,
      password: newPassword
    });
  }
}
