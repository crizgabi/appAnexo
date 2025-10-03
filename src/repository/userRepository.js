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
};