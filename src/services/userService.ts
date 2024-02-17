import { IUser } from "../controllers/userController";

interface UserService {
  createUser: (user: IUser) => Promise<IUser>;
  listAllUsers: () => Promise<IUser[]>;
}

const users: IUser[] = [];

const userService: UserService = {
  createUser: async (user: IUser) => {
    const existingUser: IUser | undefined = users.find(
      (u) => u.cpf === user.cpf
    );
    if (existingUser) {
      return Promise.reject(new Error("Já existe um usuário com o mesmo CPF."));
    }

    users.push(user);
    return user;
  },

  listAllUsers: async () => {
    return users;
  },
};

export default userService;
