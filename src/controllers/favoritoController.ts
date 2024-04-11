import { Request, Response } from "express";
import favoritoService from "../services/favoritoService";

export interface IFavorito {
  comum_usuario_id: number;
  jogo_id: number;
}

const favoritoController = {
  createFavorito: async (req: Request, res: Response) => {
    try {
      const { comum_usuario_id, jogo_id } = req.body;

      const createdFavorito = await favoritoService.createFavorito(
        comum_usuario_id,
        jogo_id
      );
      return res.status(201).json(createdFavorito);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listFavoritoById: async (req: Request, res: Response) => {
    try {
      const comum_usuario_id = parseInt(req.params.comum_usuario_id);
      const jogo_id = parseInt(req.params.jogo_id);

      const favorito: IFavorito | undefined =
        await favoritoService.listFavoritoById(comum_usuario_id, jogo_id);
      return res.status(200).json(favorito);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateFavorito: async (req: Request, res: Response) => {
    try {
      const comum_usuario_id = parseInt(req.params.comum_usuario_id);
      const jogo_id = parseInt(req.params.jogo_id);
      const { new_comum_usuario_id, new_jogo_id } = req.body;

      const updatedFavorito = await favoritoService.updateFavorito(
        comum_usuario_id,
        jogo_id,
        new_comum_usuario_id,
        new_jogo_id
      );
      if (!updatedFavorito) {
        return res.status(404).json({ message: "Favorito não encontrado" });
      }
      return res.status(200).json(updatedFavorito);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteFavorito: async (req: Request, res: Response) => {
    try {
      const comum_usuario_id = parseInt(req.params.comum_usuario_id);
      const jogo_id = parseInt(req.params.jogo_id);

      const deleted = await favoritoService.deleteFavorito(
        comum_usuario_id,
        jogo_id
      );
      if (!deleted) {
        return res.status(404).json({ message: "Favorito não encontrado" });
      }
      return res.status(200).json({ message: "Favorito excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllFavoritos: async (req: Request, res: Response) => {
    try {
      const favoritos: IFavorito[] = await favoritoService.listAllFavoritos();
      return res.status(200).json(favoritos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default favoritoController;
