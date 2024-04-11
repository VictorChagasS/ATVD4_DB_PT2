import express, { Express } from "express";
import favoritoController from "../controllers/favoritoController";
const favoritoRouter: Express = express();

favoritoRouter.get(
  "/:comum_usuario_id/:jogo_id",
  favoritoController.listFavoritoById
);
favoritoRouter.get("/", favoritoController.listAllFavoritos);
favoritoRouter.post("/", favoritoController.createFavorito);
favoritoRouter.delete(
  "/:comum_usuario_id/:jogo_id",
  favoritoController.deleteFavorito
);
favoritoRouter.put(
  "/:comum_usuario_id/:jogo_id",
  favoritoController.updateFavorito
);

export default favoritoRouter;
