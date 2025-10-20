import { getConnection } from "../../src/db/fireBird.js";

export const CustomerAppOsRepository = {
  getCustomerByCpfCnpj: async (cpfCnpj) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT
            PKCODCLI,
            RAZAOSOCIAL,
            NOMEFANTASIA,
            ENDERECO,
            NUM,
            CEP,
            FKCODCID,
            FONE1,
            EMAIL,
            TIPOFJ,
            CNPJCPF
          FROM TBCLIENTE
          WHERE CNPJCPF = ?
        `;

        db.query(query, [cpfCnpj], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          resolve(result[0] || null);
        });
      });
    });
  },
};