import dotenv from "dotenv";
dotenv.config();
import firebird from "node-firebird";


export function getFirebirdOptions(dbEnvKey) {
  return {
    host: process.env[`${dbEnvKey}_HOST`],
    port: Number(process.env[`${dbEnvKey}_PORT`]),
    database: process.env[`${dbEnvKey}_DATABASE`],
    user: process.env[`${dbEnvKey}_USER`],
    password: process.env[`${dbEnvKey}_PASSWORD`],
    lowercase_keys: false,
    role: null,
    pageSize: 4096,
  };
}

export function getConnection(dbEnvKey, callback) {
  const options = getFirebirdOptions(dbEnvKey);

  firebird.attach(options, (err, db) => {
    if (err) {
      console.error("Erro ao conectar Firebird:", err);
      return callback(err, null);
    }
    callback(null, db);
  });
}