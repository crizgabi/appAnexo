import Firebird from "node-firebird";

const options = {
  host: "localhost",
  port: 3050,
  database: "C:/firebird/data/app_users.fdb", // caminho do banco
  user: "SYSDBA",
  password: "masterkey",
  lowercase_keys: false, // mantém as colunas no formato original
  role: null,
  pageSize: 4096
};

// função auxiliar para abrir conexão
export const connectDb = () => {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
};