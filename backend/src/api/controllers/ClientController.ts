import { Request, Response } from 'express';
import { IClient } from '../../utils/interfaces/IClient';
import { ClientRepository } from '../repositories/ClientRepository';
import { CreateClient, ReadClient, ReadAllClients, UpdateClient, DeleteClient } from '../services/client';
import { ReadClientByParams } from '../services/client/ReadClientByParams';

const repository = new ClientRepository();

export class ClientController {
  static async create(req: Request, res: Response) {
    const user_id = req.user?.id as string;
    const { name, email, cpf, address, phone }: IClient = req.body;

    const createClient = new CreateClient(repository);

    await createClient.execute({
      user_id,
      name,
      email,
      cpf,
      address,
      phone
    });

    return res.sendStatus(201);
  }

  static async read(req: Request, res: Response) {
    const user_id = req.user?.id as string;
    const { id } = req.body;

    const readClient = new ReadClient(repository);

    const client = await readClient.execute(id, user_id);

    return res.status(200).json(client);
  }

  static async readAll(req: Request, res: Response) {
    const user_id = req.user?.id as string;

    const readClients = new ReadAllClients(repository);

    const clients = await readClients.execute(user_id);

    return res.status(200).json(clients);
  }

  static async readByParam(req: Request, res: Response) {
    const user_id = req.user?.id as string;
    const { param } = req.body;

    const readClients = new ReadClientByParams(repository);

    const clients = await readClients.execute(user_id, param);

    return res.status(200).json(clients);
  }

  static async update(req: Request, res: Response) {
    const user_id = req.user?.id as string;
    const { id } = req.params;
    const { name, email, cpf, address, phone } = req.body;

    const updateClient = new UpdateClient(repository);

    await updateClient.execute(id, user_id, {
      name,
      email,
      cpf,
      address,
      phone
    });

    return res.sendStatus(200);
  }

  static async delete(req: Request, res: Response) {
    const user_id = req.user?.id as string;
    const { id } = req.body;

    const deleteClient = new DeleteClient(repository);

    await deleteClient.execute(id, user_id);

    return res.sendStatus(200);
  }
}
