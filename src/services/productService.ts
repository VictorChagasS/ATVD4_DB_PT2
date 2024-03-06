// services/productService.ts
import { IProduct } from "../controllers/productController";
import pool from "../database";

interface ProductService {
  createProduct: (nome: string, preco: number) => Promise<IProduct>;
  listById: (id: number) => Promise<IProduct | undefined>;
  listAll: () => Promise<IProduct[]>;
  updateProduct: (
    id: number,
    nome: string,
    preco: number
  ) => Promise<IProduct | undefined>;
  deleteProduct: (id: number) => Promise<boolean>;
}

const productService: ProductService = {
  createProduct: async (nome: string, preco: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *",
        [nome, preco]
      );
      client.release();
      return result.rows[0] as IProduct;
    } catch (error) {
      throw new Error("Erro ao criar produto no banco de dados");
    }
  },

  listById: async (id: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM produtos WHERE id = $1",
        [id]
      );
      client.release();
      return result.rows[0] as IProduct;
    } catch (error) {
      throw new Error("Erro ao buscar produto no banco de dados");
    }
  },

  listAll: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM produtos");
      client.release();
      return result.rows as IProduct[];
    } catch (error) {
      throw new Error("Erro ao buscar produtos no banco de dados");
    }
  },

  updateProduct: async (id: number, nome: string, preco: number) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *",
        [nome, preco, id]
      );
      client.release();
      return result.rows[0] as IProduct;
    } catch (error) {
      throw new Error("Erro ao atualizar produto no banco de dados");
    }
  },

  deleteProduct: async (id: number) => {
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM produtos WHERE id = $1", [id]);
      client.release();
      return true;
    } catch (error) {
      throw new Error("Erro ao excluir produto no banco de dados");
    }
  },
};

export default productService;
