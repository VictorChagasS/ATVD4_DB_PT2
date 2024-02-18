import { IUser } from "../controllers/userController";

interface UserService {
  createUser: (
    cpf: number,
    nome: string,
    data_nascimento: Date
  ) => Promise<IUser>;
  listById: (id: number) => Promise<IUser | undefined>;
}

const users: IUser[] = [];

const userService: UserService = {
  createUser: async (cpf: number, nome: string, data_nascimento: Date) => {
    const existingUser: IUser | undefined = users.find((u) => u.cpf === cpf);
    if (existingUser) {
      throw new Error("Já existe um usuário com o mesmo CPF.");
    }

    const user: IUser = {
      id: users.length + 1,
      nome,
      cpf,
      data_nascimento,
    };

    users.push(user);
    return user;
  },

  listById: async (id: number) => {
    const user: IUser | undefined = users.find((u) => u.id === id);
    if (!user) {
      throw new Error("Usuário não existe.");
    }
    return user;
  },
};

export default userService;
