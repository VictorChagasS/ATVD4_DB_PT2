import { IUser } from "../controllers/userController";
import pool from "../database";

interface UserService {
  createCommonUser: (
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date
  ) => Promise<IUser>;
  listCommonUserById: (id: number) => Promise<IUser | undefined>;
  updateCommonUser: (
    id: number,
    nome: string,
    senha: string,
    dataNascimento: Date
  ) => Promise<IUser | undefined>;
  deleteCommonUser: (id: number) => Promise<boolean>;
  listAllCommonUsers: () => Promise<IUser[]>;
}

const userService: UserService = {
  createCommonUser: async (
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date
  ) => {
    try {
      const client = await pool.connect();
      await client.query("BEGIN");
      const resultUser = await client.query(
        "INSERT INTO wikiJogosLocal.Usuario (Nome, Email, Senha, DataNascimento) VALUES ($1, $2, $3, $4) RETURNING ID",
        [nome, email, senha, dataNascimento]
      );
      const userId = resultUser.rows[0].id;
      console.log(userId);
      const resultCommon = await client.query(
        "INSERT INTO wikiJogosLocal.Comum (Usuario_ID) VALUES ($1)",
        [userId]
      );
      await client.query("COMMIT");
      client.release();
      return {
        ID: userId,
        Nome: nome,
        Email: email,
        Senha: senha,
        DataNascimento: dataNascimento,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar usuário comum no banco de dados");
    }
  },

  listCommonUserById: async (id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT u.ID, u.Nome, u.Email, u.Senha, u.DataNascimento FROM wikiJogosLocal.Usuario u INNER JOIN wikiJogosLocal.Comum c ON u.ID = c.Usuario_ID WHERE u.ID = $1",
        [id]
      );
      client.release();
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error("Erro ao buscar usuário comum no banco de dados");
    }
  },

  updateCommonUser: async (
    id: number,
    nome: string,
    senha: string,
    dataNascimento: Date
  ) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE wikiJogosLocal.Usuario SET Nome = $1, Senha = $2, DataNascimento = $3 WHERE ID IN (SELECT Usuario_ID FROM wikiJogosLocal.Comum WHERE Usuario_ID = $4) RETURNING *",
        [nome, senha, dataNascimento, id]
      );
      client.release();
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário comum no banco de dados");
    }
  },

  deleteCommonUser: async (id: number) => {
    try {
      const client = await pool.connect();
      await client.query(
        "DELETE FROM wikiJogosLocal.Comum WHERE Usuario_ID = $1",
        [id]
      );
      await client.query("DELETE FROM wikiJogosLocal.Usuario WHERE ID = $1", [
        id,
      ]);
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir usuário comum no banco de dados");
    }
  },

  listAllCommonUsers: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT ID, Nome, Email, Senha, DataNascimento FROM wikiJogosLocal.Usuario"
      );
      client.release();
      return result.rows as IUser[];
    } catch (error) {
      throw new Error(
        "Erro ao buscar todos os usuários comuns no banco de dados"
      );
    }
  },
};

export default userService;
