import { getConnection } from "../db/fireBird.js";

export const TecnicoRepository = {
  findAll() {
    return new Promise((resolve, reject) => {
      getConnection((err, conn) => {
        if (err) return reject(err);

        const query = `
          SELECT 
            PKTECNICO AS IDTECNICO,
            NMTECNICO AS NOME,
            ATIVO
          FROM TBTECNICO
          WHERE ATIVO = 1
        `;

        conn.query(query, [], (err, result) => {
          if (err) return reject(err);

          const tecnicos = result.map(row => ({
            idTecnico: row.IDTECNICO,
            nome: row.NOME,
          }));

          resolve(tecnicos);
        });
      });
    });
  },

  // findById(idTecnico) {
  //   return new Promise((resolve, reject) => {
  //     getConnection((err, conn) => {
  //       if (err) return reject(err);

  //       const query = `
  //         SELECT 
  //           PKTECNICO AS IDTECNICO,
  //           NMTECNICO AS NOME,
  //           FONE1 as TELEFONE
  //         FROM TBTECNICO
  //         WHERE PKTECNICO = ?
  //       `;

  //      conn.query(query, [idTecnico], (err, result) => {
  //         conn.detach();

  //         if (err) return reject(err);

  //         if (!result || result.length === 0) {
  //           return resolve(null);
  //         }

  //         resolve(result[0]);
  //         });
  //       });
  //     });
  // },
};
