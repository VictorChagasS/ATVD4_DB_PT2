import express, { Express } from "express";
import favoritoRouter from "./favoritoRouter";
import jogoRouter from "./jogoRouter";
import userRouter from "./userRouter";
const router: Express = express();

router.use("/user", userRouter);
router.use("/jogo", jogoRouter);
router.use("/favoritos", favoritoRouter);

export default router;
