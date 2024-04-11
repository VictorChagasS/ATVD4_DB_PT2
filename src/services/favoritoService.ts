// services/favoritoService.ts
import { IFavorito } from "../controllers/favoritoController";
import pool from "../database";

interface FavoritoService {
  createFavorito: (
    comum_usuario_id: number,
    jogo_id: number
  ) => Promise<IFavorito>;
  listFavoritoById: (
    comum_usuario_id: number,
    jogo_id: number
  ) => Promise<IFavorito | undefined>;
  listAllFavoritos: () => Promise<IFavorito[]>;
  updateFavorito: (
    comum_usuario_id: number,
    jogo_id: number,
    new_comum_usuario_id: number,
    new_jogo_id: number
  ) => Promise<IFavorito | undefined>;
  deleteFavorito: (
    comum_usuario_id: number,
    jogo_id: number
  ) => Promise<boolean>;
}

const favoritoService: FavoritoService = {
  createFavorito: async (comum_usuario_id: number, jogo_id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO wikijogoslocal.favoritos (comum_usuario_id, jogo_id) VALUES ($1, $2) RETURNING *",
        [comum_usuario_id, jogo_id]
      );
      client.release();
      return result.rows[0] as IFavorito;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar favorito no banco de dados");
    }
  },

  listFavoritoById: async (comum_usuario_id: number, jogo_id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM wikijogoslocal.favoritos WHERE comum_usuario_id = $1 AND jogo_id = $2",
        [comum_usuario_id, jogo_id]
      );
      client.release();
      return result.rows[0] as IFavorito;
    } catch (error) {
      throw new Error("Erro ao buscar favorito no banco de dados");
    }
  },

  updateFavorito: async (
    comum_usuario_id: number,
    jogo_id: number,
    new_comum_usuario_id: number,
    new_jogo_id: number
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE wikijogoslocal.favoritos SET comum_usuario_id = $1, jogo_id = $2 WHERE comum_usuario_id = $3 AND jogo_id = $4 RETURNING *",
        [new_comum_usuario_id, new_jogo_id, comum_usuario_id, jogo_id]
      );
      client.release();
      return result.rows[0] as IFavorito;
    } catch (error) {
      throw new Error("Erro ao atualizar favorito no banco de dados");
    }
  },

  deleteFavorito: async (comum_usuario_id: number, jogo_id: number) => {
    try {
      const client = await pool.connect();
      await client.query(
        "DELETE FROM wikijogoslocal.favoritos WHERE comum_usuario_id = $1 AND jogo_id = $2",
        [comum_usuario_id, jogo_id]
      );
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir favorito no banco de dados");
    }
  },

  listAllFavoritos: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM wikijogoslocal.favoritos"
      );
      client.release();
      return result.rows as IFavorito[];
    } catch (error) {
      throw new Error("Erro ao buscar todos os favoritos no banco de dados");
    }
  },
};

export default favoritoService;
