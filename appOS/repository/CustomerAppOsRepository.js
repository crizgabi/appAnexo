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
            COMP,
            CEP,
            BAIRRO,
            FKCODCID,
            FAX,
            FONE1,
            FONE2,
            FONE1WHATSAPP,
            FONE2WHATSAPP,
            CELULARWHATSAPP,
            EMAIL,
            OBS,
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