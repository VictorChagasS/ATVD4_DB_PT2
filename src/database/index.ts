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
  database: "wikiJogosLocal",
  password: "postgres",
  port: 5432,
};

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    return console.error("Erro ao conectar ao PostgreSQL", err.stack);
  }
  console.log("Conexão com o PostgreSQL estabelecida com sucesso.");
});

/*
 const createTables = `
    -- Tabela Usuario
    CREATE TABLE IF NOT EXISTS wikiJogosLocal.Usuario (
      ID SERIAL PRIMARY KEY,
      Nome VARCHAR(80) NOT NULL,
      Email VARCHAR(80) NOT NULL,
      Senha VARCHAR(45) NOT NULL,
      DataNascimento DATE
    );

    -- Tabela Comum
    CREATE TABLE IF NOT EXISTS wikiJogosLocal.Comum (
      Usuario_ID INT PRIMARY KEY,
      FOREIGN KEY (Usuario_ID) REFERENCES wikiJogosLocal.Usuario(ID)
    );

    -- Tabela Jogo
    CREATE TABLE IF NOT EXISTS wikiJogosLocal.Jogo (
      ID SERIAL PRIMARY KEY,
      Nome VARCHAR(45) NOT NULL,
      Descricao VARCHAR(45) NOT NULL,
      Desenvolvedor VARCHAR(45) NOT NULL,
      Data DATE NOT NULL
    );

    -- Tabela Favoritos
    CREATE TABLE IF NOT EXISTS wikiJogosLocal.Favoritos (
      Comum_Usuario_ID INT NOT NULL,
      Jogo_ID INT NOT NULL,
      PRIMARY KEY (Comum_Usuario_ID, Jogo_ID),
      FOREIGN KEY (Comum_Usuario_ID) REFERENCES wikiJogosLocal.Comum(Usuario_ID),
      FOREIGN KEY (Jogo_ID) REFERENCES wikiJogosLocal.Jogo(ID)
    );
  `;
*/

  /*client.query(createTables, (err, result) => {
    release();
    if (err) {
      return console.error("Erro ao criar tabelas", err.stack);
    }
    console.log("Tabelas criadas com sucesso.");
  });*/
export default db;
