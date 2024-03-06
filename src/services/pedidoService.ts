import { IPedido } from "../controllers/pedidoController";
import pool from "../database/";

interface PedidoService {
  createPedido: (
    usuario_id: number,
    produto_id: number,
    quantidade: number
  ) => Promise<IPedido>;
  listPedidoById: (id: number) => Promise<IPedido | undefined>;
  listAllPedidos: () => Promise<IPedido[]>;

  updatePedido: (
    id: number,
    usuario_id: number,
    produto_id: number,
    quantidade: number
  ) => Promise<IPedido | undefined>;
  deletePedido: (id: number) => Promise<boolean>;
}

const pedidoService: PedidoService = {
  createPedido: async (
    usuario_id: number,
    produto_id: number,
    quantidade: number
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO pedidos (usuario_id, produto_id, quantidade) VALUES ($1, $2, $3) RETURNING *",
        [usuario_id, produto_id, quantidade]
      );
      client.release();
      return result.rows[0] as IPedido;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar pedido no banco de dados");
    }
  },

  listPedidoById: async (id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM pedidos WHERE id = $1", [
        id,
      ]);
      client.release();
      return result.rows[0] as IPedido;
    } catch (error) {
      throw new Error("Erro ao buscar pedido no banco de dados");
    }
  },

  updatePedido: async (
    id: number,
    usuario_id: number,
    produto_id: number,
    quantidade: number
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE pedidos SET usuario_id = $1, produto_id = $2, quantidade = $3 WHERE id = $4 RETURNING *",
        [usuario_id, produto_id, quantidade, id]
      );
      client.release();
      return result.rows[0] as IPedido;
    } catch (error) {
      throw new Error("Erro ao atualizar pedido no banco de dados");
    }
  },

  deletePedido: async (id: number) => {
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM pedidos WHERE id = $1", [id]);
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir pedido no banco de dados");
    }
  },

  listAllPedidos: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM pedidos");
      client.release();
      return result.rows as IPedido[];
    } catch (error) {
      throw new Error("Erro ao buscar todos os pedidos no banco de dados");
    }
  },
};

export default pedidoService;
