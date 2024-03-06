// services/userService.ts
import { IUser } from "../controllers/userController";
import pool from "../database";

interface UserService {
  createUser: (
    cpf: number,
    nome: string,
    data_nascimento: Date
  ) => Promise<IUser>;
  listById: (id: number) => Promise<IUser | undefined>;
  updateUser: (
    id: number,
    nome: string,
    data_nascimento: Date
  ) => Promise<IUser | undefined>;
  deleteUser: (id: number) => Promise<boolean>;
  listAllUsers: () => Promise<IUser[]>;
}

const userService: UserService = {
  createUser: async (cpf: number, nome: string, data_nascimento: Date) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO usuarios (cpf, nome, data_nascimento) VALUES ($1, $2, $3) RETURNING *",
        [cpf, nome, data_nascimento]
      );
      client.release();
      return result.rows[0] as IUser;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar usuário no banco de dados");
    }
  },

  listById: async (id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
      );
      client.release();
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error("Erro ao buscar usuário no banco de dados");
    }
  },
  updateUser: async (id: number, nome: string, data_nascimento: Date) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE usuarios SET nome = $1, data_nascimento = $2 WHERE id = $3 RETURNING *",
        [nome, data_nascimento, id]
      );
      client.release();
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário no banco de dados");
    }
  },

  deleteUser: async (id: number) => {
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM usuarios WHERE id = $1", [id]);
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir usuário no banco de dados");
    }
  },
  listAllUsers: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM usuarios");
      client.release();
      return result.rows as IUser[];
    } catch (error) {
      throw new Error("Erro ao buscar todos os usuários no banco de dados");
    }
  },
};

export default userService;
