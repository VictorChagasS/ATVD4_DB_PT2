import express, { Express } from "express";
import useRouter from "./userRouter";
const router: Express = express();

router.use("/", useRouter);

export default useRouter;
