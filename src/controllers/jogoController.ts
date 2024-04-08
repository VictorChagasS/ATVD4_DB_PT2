import { Request, Response } from "express";
import jogoService from "../services/jogoService";

export interface IJogo {
  id: number;
  nome: string;
  descricao: string;
  desenvolvedor: string;
  data: Date;
}

const jogoController = {
  createJogo: async (req: Request, res: Response) => {
    try {
      const { nome, descricao, desenvolvedor, data } = req.body;

      const dataPostgres = data.split("/").reverse().join("-");

      const createdJogo = await jogoService.createJogo(
        nome,
        descricao,
        desenvolvedor,
        dataPostgres
      );
      return res.status(201).json(createdJogo);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const jogo: IJogo | undefined = await jogoService.listById(id);
      return res.status(200).json(jogo);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAll: async (req: Request, res: Response) => {
    try {
      const jogos: IJogo[] = await jogoService.listAll();
      return res.status(200).json(jogos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateJogo: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const { nome, descricao, desenvolvedor, data } = req.body;

      const dataPostgres = data.split("/").reverse().join("-");

      const updatedJogo = await jogoService.updateJogo(
        id,
        nome,
        descricao,
        desenvolvedor,
        dataPostgres
      );

      if (!updatedJogo) {
        return res.status(404).json({ message: "Jogo não encontrado" });
      }

      return res.status(200).json(updatedJogo);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteJogo: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deletedJogo = await jogoService.deleteJogo(id);

      if (!deletedJogo) {
        return res.status(404).json({ message: "Jogo não encontrado" });
      }

      return res.status(200).json({ message: "Jogo excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default jogoController;
