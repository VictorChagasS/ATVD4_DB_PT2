import { Request, Response } from "express";
import userService from "../services/userService";

export interface IUser {
  nome: string;
  cpf: number;
  data_nascimento: Date;
}

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const [day, month, year] = req.body.data_nascimento.split("/");

      const user: IUser = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: new Date(year, month - 1, day),
      };

      if (isNaN(user.cpf)) {
        throw new Error("CPF deve ser um número ou ter 11 dígitos");
      }
      const createdUser = await userService.createUser(user);
      return res.status(201).json(createdUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllUsers: async (req: Request, res: Response) => {
    const users: IUser[] = await userService.listAllUsers();
    return res.status(200).json(users);
  },
};

export default userController;
