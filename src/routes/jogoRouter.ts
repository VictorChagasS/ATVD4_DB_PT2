import express, { Express } from "express";
import jogoController from "../controllers/jogoController";
const jogoRouter: Express = express();

jogoRouter.get("/:id", jogoController.listById);
jogoRouter.get("/", jogoController.listAll);
jogoRouter.post("/", jogoController.createJogo);
jogoRouter.delete("/:id", jogoController.deleteJogo);
jogoRouter.put("/:id", jogoController.updateJogo);

export default jogoRouter;
