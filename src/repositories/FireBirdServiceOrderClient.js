import { getConnection } from "../db/fireBird.js";

export const FireBirdServiceOrderClient = {
  create: (os, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          INSERT INTO TBCONSERTO (
            FKCLIENTE, FKTECNICO, FKEQUIPAMENTO,
            FKSTATUS, OBS, NSERIE, DEFEITORECLAMADO,
            LOCALATENDIMENTO, TIPOCONS, SITUACAO,
            DATACONSERTO, HORA, DATACAD, DATAATU
          )
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          RETURNING PKCONSERTO, CODIDENTIFICADOR
        `;

        const params = [
          os.idCliente,
          os.idTecnico ?? null,
          os.idEquipamento ?? null,
          os.idStatus ?? 1,
          os.observacao ?? null,
          os.numeroSerie ?? null,
          os.defeitoReclamado ?? null,
          os.localAtendimento ?? null,
          os.tipoConserto ?? null,
          os.situacao ?? 0,
          os.dataConserto ?? null,
          os.hora ?? null,
          os.dataCadastro ?? new Date(),
          os.dataAtualizacao ?? new Date()
        ];

        db.query(query, params, (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          // result can be an array with row object or a single object depending on driver
          const row = Array.isArray(result) ? result[0] : result;
          if (!row || (row && row.PKCONSERTO == null)) {
            return reject(new Error("Não foi retornado PKCONSERTO"));
          }

          resolve({
            idConserto: row.PKCONSERTO,
            numeroOS: row.CODIDENTIFICADOR ?? ""
          });
        });
      });
    });
  },

  getAll: (dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT
            C.PKCONSERTO AS idConserto,
            C.CODIDENTIFICADOR AS numeroOS,
            C.FKCLIENTE AS idCliente,
            CL.RAZAOSOCIAL AS nomeCliente,
            C.FKEQUIPAMENTO AS idEquipamento,
            EQ.EQUIPAMENTO AS nomeEquipamento,
            C.DEFEITORECLAMADO AS defeitoReclamado,
            C.FKSTATUS AS idStatus,
            S.NOMESTATUS AS nomeStatus,
            C.FKTECNICO AS idTecnicoResponsavel,
            T.NMTECNICO AS nomeTecnicoResponsavel,
            C.DATACONSERTO AS dataConserto,
            C.HORA AS hora,
            C.OBS AS observacao,
            C.DATACAD AS dataCadastro,
            C.DATAATU AS dataAtualizacao
          FROM TBCONSERTO C
          LEFT JOIN TBCLIENTE CL ON CL.PKCODCLI = C.FKCLIENTE
          LEFT JOIN TBEQUIPAMENTO EQ ON EQ.PKEQUIPAMENTO = C.FKEQUIPAMENTO
          LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
          LEFT JOIN TBSTATUS S ON S.PKSTATUS = C.FKSTATUS
          ORDER BY C.PKCONSERTO DESC
        `;

        db.query(query, [], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          console.log("DEBUG FIREBIRD -> PRIMEIRA LINHA:", result[0]);
          resolve(result || []);
        });
      });
    });
  },

  getById: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT
            C.PKCONSERTO AS idConserto,
            C.CODIDENTIFICADOR AS numeroOS,
            C.FKCLIENTE AS idCliente,
            CL.RAZAOSOCIAL AS nomeCliente,
            C.FKEQUIPAMENTO AS idEquipamento,
            EQ.EQUIPAMENTO AS nomeEquipamento,
            C.DEFEITORECLAMADO AS defeitoReclamado,
            C.FKSTATUS AS idStatus,
            S.NOMESTATUS AS nomeStatus,
            C.FKTECNICO AS idTecnicoResponsavel,
            T.NMTECNICO AS nomeTecnicoResponsavel,
            C.DATACONSERTO AS dataConserto,
            C.HORA AS hora,
            C.OBS AS observacao,
            C.DATACAD AS dataCadastro,
            C.DATAATU AS dataAtualizacao
          FROM TBCONSERTO C
          LEFT JOIN TBCLIENTE CL ON CL.PKCODCLI = C.FKCLIENTE
          LEFT JOIN TBEQUIPAMENTO EQ ON EQ.PKEQUIPAMENTO = C.FKEQUIPAMENTO
          LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
          LEFT JOIN TBSTATUS S ON S.PKSTATUS = C.FKSTATUS
          WHERE C.PKCONSERTO = ?
        `;

        db.query(query, [id], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve((result && result[0]) || null);
        });
      });
    });
  },

  update: (id, os, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
          UPDATE TBCONSERTO SET
            FKCLIENTE = ?,
            FKTECNICO = ?,
            FKEQUIPAMENTO = ?,
            DEFEITORECLAMADO = ?,
            OBS = ?,
            DATACONSERTO = ?,
            HORA = ?,
            DATAATU = ?
          WHERE PKCONSERTO = ?
        `;

        const params = [
          os.idCliente,
          os.idTecnico ?? null,
          os.idEquipamento ?? null,
          os.defeitoReclamado ?? null,
          os.observacao ?? null,
          os.dataConserto ?? null,
          os.hora ?? null,
          os.dataAtualizacao ?? new Date(),
          id
        ];

        db.query(query, params, (qErr) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(true);
        });
      });
    });
  },

  delete: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        db.query(
          `DELETE FROM TBCONSERTO WHERE PKCONSERTO = ?`,
          [id],
          (qErr) => {
            db.detach();
            if (qErr) return reject(qErr);
            resolve(true);
          }
        );
      });
    });
  }
};
