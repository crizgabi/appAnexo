import { getConnection } from "./src/db/fireBird.js";

getConnection((err, db) => {
  if (err) {
    console.error("❌ Erro de conexão:", err);
    process.exit(1);
  } else {
    console.log("✅ Conexão funcionando! Vou rodar uma query de teste...");

      db.query("SELECT * FROM TBUSUARIO", (qErr, result) => {
      if (qErr) {
        console.error("❌ Erro na query teste:", qErr);
      } else {
        console.log("✅ Query OK — resultado:", result);
      }

      db.detach((dErr) => {
        if (dErr) console.error("Erro ao desconectar:", dErr);
        else console.log("Conexão fechada.");
        process.exit(qErr || dErr ? 1 : 0);
      });
    });
  }
});