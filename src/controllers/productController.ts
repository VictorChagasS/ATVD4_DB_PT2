import { Request, Response } from "express";
import productService from "../services/productService";

export interface IProduct {
  id: number;
  nome: string;
  preco: number;
}

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { nome, preco } = req.body;

      const createdProduct = await productService.createProduct(nome, preco);
      return res.status(201).json(createdProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const product: IProduct | undefined = await productService.listById(id);
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  listAll: async (req: Request, res: Response) => {
    try {
      const products: IProduct[] = await productService.listAll();
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { nome, preco } = req.body;

      const updatedProduct = await productService.updateProduct(
        id,
        nome,
        preco
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const deletedProduct = await productService.deleteProduct(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default productController;
