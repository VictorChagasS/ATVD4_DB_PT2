import { Request, Response } from "express";
import pedidoService from "../services/pedidoService";

export interface IPedido {
  id: number;
  usuario_id: number;
  produto_id: number;
  quantidade: number;
  data_pedido: Date;
}

const pedidoController = {
  createPedido: async (req: Request, res: Response) => {
    try {
      const { usuario_id, produto_id, quantidade } = req.body;

      const createdPedido = await pedidoService.createPedido(
        usuario_id,
        produto_id,
        quantidade
      );
      return res.status(201).json(createdPedido);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listPedidoById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const pedido: IPedido | undefined = await pedidoService.listPedidoById(
        id
      );
      return res.status(200).json(pedido);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updatePedido: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { usuario_id, produto_id, quantidade } = req.body;

      const updatedPedido = await pedidoService.updatePedido(
        id,
        usuario_id,
        produto_id,
        quantidade
      );
      if (!updatedPedido) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      return res.status(200).json(updatedPedido);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deletePedido: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await pedidoService.deletePedido(id);
      if (!deleted) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      return res.status(200).json({ message: "Pedido excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAllPedidos: async (req: Request, res: Response) => {
    try {
      const pedidos: IPedido[] = await pedidoService.listAllPedidos();
      return res.status(200).json(pedidos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default pedidoController;
