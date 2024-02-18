import { Request, Response } from "express";
import userService from "../services/userService";

export interface IUser {
  id: number;
  nome: string;
  cpf: number;
  data_nascimento: Date;
}

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { nome, cpf, data_nascimento } = req.body;

      const [day, month, year] = data_nascimento.split("/");
      const data_nascimento_formatada = new Date(year, month - 1, day);

      const createdUser = await userService.createUser(
        cpf,
        nome,
        data_nascimento_formatada
      );
      return res.status(201).json(createdUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const user: IUser | undefined = await userService.listById(id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default userController;
