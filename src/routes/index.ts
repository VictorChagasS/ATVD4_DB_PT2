import express, { Express } from "express";
import pedidoRouter from "./pedidoRouter";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
const router: Express = express();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/pedido", pedidoRouter);

export default router;
