import express, { Express } from "express";
import userController from "../controllers/userController";
const useRouter: Express = express();

useRouter.get("/", userController.listAllUsers);
useRouter.post("/", userController.createUser);

export default useRouter;
