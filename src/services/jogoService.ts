// services/JogoService.ts
import { IJogo } from "../controllers/jogoController";
import pool from "../database";

interface JogoService {
  createJogo: (
    nome: string,
    descricao: string,
    desenvolvedor: string,
    data: string
  ) => Promise<IJogo>;
  listById: (id: number) => Promise<IJogo | undefined>;
  listAll: () => Promise<IJogo[]>;
  updateJogo: (
    id: number,
    nome: string,
    descricao: string,
    desenvolvedor: string,
    data: Date
  ) => Promise<IJogo | undefined>;
  deleteJogo: (id: number) => Promise<boolean>;
}

const JogoService: JogoService = {
  createJogo: async (
    nome: string,
    descricao: string,
    desenvolvedor: string,
    data: string
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO wikijogoslocal.jogo (nome, descricao, desenvolvedor, data) VALUES ($1, $2, $3, $4) RETURNING *",
        [nome, descricao, desenvolvedor, data]
      );
      client.release();
      return result.rows[0] as IJogo;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar jogo no banco de dados");
    }
  },

  listById: async (id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM wikijogoslocal.jogo WHERE id = $1",
        [id]
      );
      client.release();
      return result.rows[0] as IJogo;
    } catch (error) {
      throw new Error("Erro ao buscar jogo no banco de dados");
    }
  },

  listAll: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM wikijogoslocal.jogo");
      client.release();
      return result.rows as IJogo[];
    } catch (error) {
      throw new Error("Erro ao buscar jogos no banco de dados");
    }
  },

  updateJogo: async (
    id: number,
    nome: string,
    descricao: string,
    desenvolvedor: string,
    data: Date
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE wikijogoslocal.jogo SET nome = $1, descricao = $2, desenvolvedor = $3, data = $4 WHERE id = $5 RETURNING *",
        [nome, descricao, desenvolvedor, data, id]
      );
      client.release();
      return result.rows[0] as IJogo;
    } catch (error) {
      throw new Error("Erro ao atualizar jogo no banco de dados");
    }
  },

  deleteJogo: async (id: number) => {
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM wikijogoslocal.jogo WHERE id = $1", [id]);
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir jogo no banco de dados");
    }
  },
};

export default JogoService;
