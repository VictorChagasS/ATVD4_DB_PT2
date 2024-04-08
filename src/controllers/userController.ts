import { Request, Response } from "express";
import userService from "../services/userService";

export interface IUser {
  ID: number;
  Nome: string;
  Email: string;
  Senha: string;
  DataNascimento: Date;
}

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { nome, email, senha, data_nascimento } = req.body;

      const createdUser = await userService.createCommonUser(
        nome,
        email,
        senha,
        data_nascimento
      );

      const dataPostgres = data_nascimento.split("/").reverse().join("-");

      return res
        .status(201)
        .json({ createdUser, data_nascimento: dataPostgres });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const user: IUser | undefined = await userService.listCommonUserById(id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { nome, senha, data_nascimento } = req.body;

      const dataPostgres = data_nascimento.split("/").reverse().join("-");

      const updatedUser = await userService.updateCommonUser(
        id,
        nome,
        senha,
        dataPostgres
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await userService.deleteCommonUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllUsers: async (req: Request, res: Response) => {
    try {
      const users: IUser[] = await userService.listAllCommonUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default userController;
