import dotenv from "dotenv";
dotenv.config();
import firebird from "node-firebird";


const options = {
    host: process.env.FB_HOST,
    port: process.env.FB_PORT,
    database: process.env.FB_DATABASE,
    user: process.env.FB_USER,
    password: process.env.FB_PASSWORD,
    lowercase_keys: false,
    role: null,
    pageSize: 4096,
};

export function getConnection(callback) {
  firebird.attach(options, (err, db) => {
    if (err) {
      console.error("Erro ao conectar:", err);
      callback(err, null);
    } else {
      console.log("connected!")
      callback(null, db);
    }
  });
}