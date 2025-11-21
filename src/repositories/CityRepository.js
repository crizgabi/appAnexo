import { getConnection } from "../db/fireBird.js";

export const CityRepository = {
  findByNameAndUf: (nomeCidade, uf) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT PKCODCID
          FROM TBCIDADE
          WHERE UPPER(TRIM(NMCID)) = UPPER(TRIM(?))
          AND UPPER(TRIM(UFCID)) = UPPER(TRIM(?))
        `;

        const params = [nomeCidade, uf];

        db.query(query, params, (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          if (!result || result.length === 0) return resolve(null);

          resolve(result[0]);
        });
      });
    });
  },
};