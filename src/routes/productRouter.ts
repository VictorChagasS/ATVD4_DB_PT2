import express, { Express } from "express";
import productController from "../controllers/productController";
const productRouter: Express = express();

productRouter.get("/:id", productController.listById);
productRouter.get("/", productController.listAll);
productRouter.post("/", productController.createProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.put("/:id", productController.updateProduct);

export default productRouter;
