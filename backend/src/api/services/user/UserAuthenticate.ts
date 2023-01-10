import { compareSync } from 'bcrypt';
import { UserRepository } from '../../repositories/UserRepository';
import { HttpException } from '../../../utils/error/ErrorHandle';
import { secret } from '../../../config';
import { sign } from 'jsonwebtoken';

export class UserAuthenticate {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(username: string, password: string): Promise<object> {
    const user = await this.repository.readByUsername(username);

    if (!user || !compareSync(password, user.password)) {
      throw new HttpException(401, 'Email or password incorrect');
    }

    const token = sign(
      { user_id: user.id },
      secret,
      { expiresIn: '1h' },
    );

    return {
      token,
      user: {
        name: user.username,
        email: user.email,
      },
    };

  }
}
