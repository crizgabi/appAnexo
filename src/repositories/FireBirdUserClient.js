import { getConnection } from "../db/fireBird.js";

export const FireBirdUserClient = {

  findUserByLogin(login, dbEnvKey) {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = "SELECT * FROM TBUSUARIO WHERE LOGIN = ?";

        db.query(query, [login], (qErr, result) => {
          db.detach();

          if (qErr) return reject(qErr);
          resolve(result?.[0] || null);
        });
      });
    });
  },

  getUserInfo(login, dbEnvKey) {
    return new Promise((resolve, reject) => {

      const sql = `
        SELECT 
            U.LOGIN,
            U.SENHA,
            U.FKTECNICO,
            T.PKTECNICO,
            T.NMTECNICO,
            T.FONE1,
            T.FONE2,
            T.CPF,
            T.RG,
            T.ENDERECO,
            T.NUM,
            T.CEP,
            T.DATANASC,
            T.EMAIL,
            T.CELULAR
        FROM TBUSUARIO U
        LEFT JOIN TBTECNICO T ON U.FKTECNICO = T.PKTECNICO
        WHERE U.LOGIN = ?
      `;

      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        db.query(sql, [login], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          resolve(result?.[0] || null);
        });
      });
    });
  },

  getThecnicianByOsPrimaryKey: (idConserto, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        SELECT
          T.NMTECNICO,
          T.FKCODUSU
        FROM TBCONSERTO C
        LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
        WHERE C.PKCONSERTO = ?
      `;

        db.query(query, [idConserto], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(result[0] || []);
        });
      });
    });
  },

  updatePassword(login, newPassword, dbEnvKey) {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = "UPDATE TBUSUARIO SET SENHA = ? WHERE LOGIN = ?";

        db.query(query, [newPassword, login], (qErr) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(true);
        });
      });
    });
  },

  getAllUsers(dbEnvKey) {
    return new Promise((resolve, reject) => {

      const sql = `
        SELECT 
            U.LOGIN,
            U.SENHA,
            U.FKTECNICO,
            T.PKTECNICO,
            T.NMTECNICO,
            T.FONE1,
            T.FONE2,
            T.CPF,
            T.RG,
            T.ENDERECO,
            T.NUM,
            T.CEP,
            T.DATANASC,
            T.EMAIL,
            T.CELULAR
        FROM TBUSUARIO U
        LEFT JOIN TBTECNICO T ON U.FKTECNICO = T.PKTECNICO
      `;

      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        db.query(sql, [], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          resolve(result || []);
        });
      });
    });
  },
};