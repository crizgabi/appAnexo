import { getConnection } from "../db/fireBird.js";

export const UserRepository = {
  findByLogin: (login) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = "SELECT * FROM TBUSUARIO WHERE LOGIN = ?";
        db.query(query, [login], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          if (!result || result.length === 0) return resolve(null);

          resolve(result[0]);
        });
      });
    });
  },

  updatePassword: (login, newPassword) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = "UPDATE TBUSUARIO SET SENHA = ? WHERE LOGIN = ?";
        db.query(query, [newPassword, login], (uErr) => {
          db.detach();
          if (uErr) return reject(uErr);
          resolve(true);
        });
      });
    });
  },

   getUserInfo: async (login) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

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

        db.query(sql, [login], (qErr, result) => {
          if (qErr) return reject(qErr);
          resolve(result[0]); // só um usuário por login
        });
      });
    });
  }
};