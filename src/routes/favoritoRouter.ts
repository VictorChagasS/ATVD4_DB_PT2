import express, { Express } from "express";
import favoritoController from "../controllers/favoritoController";
const favoritoRouter: Express = express();

favoritoRouter.get("/:id", favoritoController.listFavoritoById);
favoritoRouter.get("/", favoritoController.listAllFavoritos);
favoritoRouter.post("/", favoritoController.createFavorito);
favoritoRouter.delete("/:id", favoritoController.deleteFavorito);
favoritoRouter.put("/:id", favoritoController.updateFavorito);

export default favoritoRouter;
