import express, { Express } from "express";
import userController from "../controllers/userController";
const useRouter: Express = express();

useRouter.get("/:id", userController.listById);
useRouter.get("/", userController.listAllUsers);
useRouter.post("/", userController.createUser);
useRouter.delete("/:id", userController.deleteUser);
useRouter.put("/:id", userController.updateUser);
export default useRouter;
