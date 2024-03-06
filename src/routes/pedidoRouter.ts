import express, { Express } from "express";
import pedidoController from "../controllers/pedidoController";
const pedidoRouter: Express = express();

pedidoRouter.get("/:id", pedidoController.listPedidoById);
pedidoRouter.get("/", pedidoController.listAllPedidos);
pedidoRouter.post("/", pedidoController.createPedido);
pedidoRouter.delete("/:id", pedidoController.deletePedido);
pedidoRouter.put("/:id", pedidoController.updatePedido);

export default pedidoRouter;
