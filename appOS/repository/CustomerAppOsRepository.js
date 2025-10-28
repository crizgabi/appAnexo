import { getConnection } from "../../src/db/fireBird.js";
import { CustomerType } from "../../src/models/CustomerModel.js";

export const CustomerAppOsRepository = {
  getCustomersByName: async (razaoSocial) => {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);
        
        const query = `
        SELECT
          PKCODCLI,
          RAZAOSOCIAL,
          CNPJCPF,
          FONE1,
          FONE2
        FROM TBCLIENTE
        WHERE UPPER(RAZAOSOCIAL) LIKE UPPER(?)
        ORDER BY RAZAOSOCIAL
      `;
        
        const params = [`%${razaoSocial}%`];
        
        db.query(query, params, (qErr, result) => {
        db.detach();
        if (qErr) return reject(qErr);

        resolve(result || []);
        });
      });
    });
  },

  getCustomerByPrimaryKey: async (primaryKey) => {
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
          WHERE PKCODCLI = ?
        `;

        db.query(query, [primaryKey], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          resolve(result[0] || null);
        });
      });
    });
  },

  //   updateCustomer: async (pkcodcli, customerData) => {
  //   return new Promise((resolve, reject) => {
  //     getConnection((err, db) => {
  //       if (err) return reject(err);

  //       const query = `
  //         UPDATE TBCLIENTE SET
  //           STATUS = ?,
  //           RAZAOSOCIAL = ?,
  //           NOMEFANTASIA = ?,
  //           FONE1 = ?,
  //           FONE2 = ?,
  //           FAX = ?,
  //           FONE1WHATSAPP = ?,
  //           FONE2WHATSAPP = ?,
  //           CELULARWHATSAPP = ?,
  //           EMAIL = ?,
  //           ENDERECO = ?,
  //           NUM = ?,
  //           COMP = ?,
  //           BAIRRO = ?,
  //           CEP = ?,
  //           FKCODCID = ?,
  //           CNPJCPF = ?,
  //           TIPOFJ = ?,
  //           OBS = ?,
  //           FKCODUSU = ?
  //         WHERE PKCODCLI = ?
  //       `;

  //       const params = [
  //         customerData.status,
  //         customerData.nome,
  //         customerData.nomeFantasia,
  //         customerData.telefone1,
  //         customerData.telefone2,
  //         customerData.fax,
  //         customerData.telefone1Whatsapp,
  //         customerData.telefone2Whatsapp,
  //         customerData.celularWhatsapp,
  //         customerData.email,
  //         customerData.endereco,
  //         customerData.num,
  //         customerData.comp,
  //         customerData.bairro,
  //         customerData.cep,
  //         customerData.codigoCidade,
  //         customerData.tipo === CustomerType.FISICA
  //           ? customerData.cpf
  //           : customerData.cnpj,
  //         customerData.tipo,
  //         customerData.obs,
  //         customerData.fkcodusu,
  //         pkcodcli,
  //       ];

  //       db.query(query, params, (qErr, result) => {
  //         db.detach();
  //         if (qErr) return reject(qErr);
  //         resolve(result);
  //       });
  //     });
  //   });
  // },
};