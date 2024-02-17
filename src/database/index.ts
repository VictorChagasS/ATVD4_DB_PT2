import { Pool } from "pg";

interface Config {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const config: Config = {
  user: "postgres",
  host: "localhost",
  database: "database_01",
  password: "root",
  port: 5433,
};

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    return console.error("Erro ao conectar ao PostgreSQL", err.stack);
  }
  console.log("Conexão com o PostgreSQL estabelecida com sucesso.");
});

export default db;
