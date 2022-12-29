import { Request, Response } from 'express';
import { IUser, IUserUpdate } from '../../utils/interfaces/IUser';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUser, DeleteUser, ReadUser, UpdateUser } from '../services';
import { UserAuthenticate } from '../services/UserAuthenticate';

const repository = new UserRepository();

export class UserController {
  static async create(req: Request, res: Response) {
    const { username, email, password }: IUser = req.body;

    const createUser = new CreateUser(repository);

    await createUser.execute({
      username,
      email,
      password
    });

    return res.sendStatus(201);
  }

  static async read(req: Request, res: Response) {
    const id = req.user?.id as string;

    const readUser = new ReadUser(repository);

    const user = await readUser.execute(id);

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
    const id = req.user?.id as string;
    const { username, email, password }: IUserUpdate = req.body;

    const updateUser = new UpdateUser(repository);

    await updateUser.execute(id, {
      username,
      email,
      password
    });

    return res.sendStatus(200);
  }

  static async delete(req: Request, res: Response) {
    const id = req.user?.id as string;

    const deleteUser = new DeleteUser(repository);

    await deleteUser.execute(id);

    return res.sendStatus(200);
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const userService = new UserAuthenticate(repository);

    const logged = await userService.execute(username, password);

    req.session.singin = true;

    return res.status(200).json(logged);
  }

  static async logout(req: Request, res: Response) {
    req.session.singin = false;

    return res.sendStatus(200);
  }
}
