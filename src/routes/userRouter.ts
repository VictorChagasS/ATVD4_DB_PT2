import express, { Express } from "express";
import userController from "../controllers/userController";
const useRouter: Express = express();

useRouter.get("/:id", userController.listById);
useRouter.post("/", userController.createUser);

export default useRouter;
