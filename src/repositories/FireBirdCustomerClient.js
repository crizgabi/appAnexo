import { getConnection } from "../db/fireBird.js";
import { CustomerType } from "../models/CustomerModel.js";

export const FireBirdCustomerClient = {

  // LISTAR TODOS OS CLIENTES (SEM FILTRO)
getAllCustomers: (dbEnvKey) => {
  return new Promise((resolve, reject) => {
    getConnection(dbEnvKey, (err, db) => {
      if (err) return reject(err);

      const query = `
        SELECT PKCODCLI, RAZAOSOCIAL, TIPOFJ, CNPJCPF, FONE1, FONE2
        FROM TBCLIENTE
        ORDER BY RAZAOSOCIAL
      `;

      db.query(query, [], (qErr, result) => {
        db.detach();
        if (qErr) return reject(qErr);
        resolve(result || []);
      });
    });
  });
},

  // LISTA CLIENTES
  getCustomersByName: (razaoSocial, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT PKCODCLI, RAZAOSOCIAL, TIPOFJ, CNPJCPF, FONE1, FONE2
          FROM TBCLIENTE
          WHERE UPPER(RAZAOSOCIAL) LIKE UPPER(?)
          ORDER BY RAZAOSOCIAL
        `;

        db.query(query, [`%${razaoSocial}%`], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(result || []);
        });
      });
    });
  },

  // BUSCA POR PRIMARY KEY
  getCustomerByPrimaryKey: (primaryKey, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT
            C.PKCODCLI,
            C.RAZAOSOCIAL,
            C.NOMEFANTASIA,
            C.ENDERECO,
            C.NUM,
            C.COMP,
            C.CEP,
            C.BAIRRO,
            C.FKCODCID,
            CI.NMCID AS NOME_CIDADE,
            C.FAX,
            C.FONE1,
            C.FONE2,
            C.FONE1WHATSAPP,
            C.FONE2WHATSAPP,
            C.CELULARWHATSAPP,
            C.EMAIL,
            C.OBS,
            C.TIPOFJ,
            C.CNPJCPF
          FROM TBCLIENTE C
          LEFT JOIN TBCIDADE CI ON C.FKCODCID = CI.PKCODCID
          WHERE C.PKCODCLI = ?
        `;

        db.query(query, [primaryKey], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(result?.[0] || null);
        });
      });
    });
  },

  // CRIA CLIENTE
  createCustomer: (customerData, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        INSERT INTO TBCLIENTE (
          STATUS,
          RAZAOSOCIAL,
          NOMEFANTASIA,
          FONE1,
          FONE2,
          FAX,
          FONE1WHATSAPP,
          FONE2WHATSAPP,
          CELULARWHATSAPP,
          EMAIL,
          ENDERECO,
          NUM,
          COMP,
          BAIRRO,
          CEP,
          FKCODCID,
          CNPJCPF,
          TIPOFJ,
          FKCODUSU,
          OBS
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING PKCODCLI
      `;

        const params = [
          customerData.status || 1,
          customerData.razaoSocial || "",
          customerData.nomeFantasia || "",
          customerData.telefone1 || "",
          customerData.telefone2 || "",
          customerData.fax || "",
          customerData.telefone1Whatsapp || 0,
          customerData.telefone2Whatsapp || 0,
          customerData.celularWhatsapp || 0,
          customerData.email || "",
          customerData.endereco || "",
          customerData.num || "",
          customerData.comp || "",
          customerData.bairro || "",
          customerData.cep || "",
          customerData.codigoCidade || 0,
          customerData.tipo === CustomerType.FISICA
            ? customerData.cpf || ""
            : customerData.cnpj || "",
          customerData.tipo,
          customerData.fkcodusu,
          customerData.obs || "",
        ];

        db.query(query, params, (qErr, result) => {
          db.detach();

          if (qErr) {
            console.error("Erro no insert do cliente:", qErr);
            return reject(qErr);
          }

          try {
            const pkcodcli =
              result?.[0]?.PKCODCLI ||
              result?.PKCODCLI ||
              (Array.isArray(result) ? result[0] : null);

            if (!pkcodcli) {
              console.error("Resultado inesperado do insert:", result);
              return reject(new Error("Não foi possível obter o PKCODCLI do cliente"));
            }

            resolve(pkcodcli);
          } catch (parseErr) {
            reject(parseErr);
          }
        });
      });
    });
  },

  // UPDATE
  updateCustomer: (pkcodcli, customerData, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        UPDATE TBCLIENTE SET
          STATUS = ?,
          RAZAOSOCIAL = ?,
          NOMEFANTASIA = ?,
          FONE1 = ?,
          FONE2 = ?,
          FAX = ?,
          FONE1WHATSAPP = ?,
          FONE2WHATSAPP = ?,
          CELULARWHATSAPP = ?,
          EMAIL = ?,
          ENDERECO = ?,
          NUM = ?,
          COMP = ?,
          BAIRRO = ?,
          CEP = ?,
          FKCODCID = ?,
          CNPJCPF = ?,
          TIPOFJ = ?,
          OBS = ?,
          FKCODUSU = ?
        WHERE PKCODCLI = ?
      `;

        const params = [
          customerData.STATUS,
          customerData.RAZAOSOCIAL,
          customerData.NOMEFANTASIA,
          customerData.FONE1,
          customerData.FONE2,
          customerData.FAX,
          customerData.FONE1WHATSAPP,
          customerData.FONE2WHATSAPP,
          customerData.CELULARWHATSAPP,
          customerData.EMAIL,
          customerData.ENDERECO,
          customerData.NUM,
          customerData.COMP,
          customerData.BAIRRO,
          customerData.CEP,
          customerData.FKCODCID,
          customerData.CNPJCPF,
          customerData.TIPOFJ,
          customerData.OBS,
          customerData.FKCODUSU,
          pkcodcli,
        ];

        db.query(query, params, (qErr) => {
          db.detach();
          if (qErr) return reject(qErr);

          resolve({ success: true });
        });
      });
    });
  },
};