import { getConnection } from "../db/fireBird.js";

export const OSRepository = {

  // ------------------ CREATE ------------------
  create(osData) {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `
          INSERT INTO TBCONSERTO (
            FKCLIENTE, FKTECNICO, FKEQUIPAMENTO,
            FKSTATUS, OBS, NSERIE, DEFEITORECLAMADO,
            LOCALATENDIMENTO, TIPOCONS, SITUACAO,
            DATACONSERTO, HORA, DATACAD, DATAATU
          )
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          RETURNING PKCONSERTO
        `;

        const params = [
          osData.idCliente,
          osData.idTecnico,
          osData.idEquipamento,
          osData.idStatus,
          osData.observacao,
          osData.numeroSerie,
          osData.defeitoReclamado,
          osData.localAtendimento,
          osData.tipoConserto,
          osData.situacao,
          osData.dataConserto,
          osData.hora,
          osData.dataCadastro,
          osData.dataAtualizacao
        ];

        db.query(query, params, (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);

          const id = result?.[0]?.PKCONSERTO || result?.PKCONSERTO || (Array.isArray(result) ? result[0] : null);
          if (!id) return reject("Não retornou PKCONSERTO");

          resolve(id);
        });
      });
    });
  },

  // ------------------ FIND BY ID ------------------
  findById(id) {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
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
            T.NOME AS nomeTecnicoResponsavel,
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
          resolve(result[0] || null);
        });
      });
    });
  },

  // ------------------ FIND ALL ------------------
  findAll() {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `
          SELECT
            C.PKCONSERTO AS idConserto,
            C.CODIDENTIFICADOR AS numeroOS,
            C.FKCLIENTE AS idCliente,
            CL.RAZAOSOCIAL AS nomeCliente,
            CL.ENDERECO AS enderecoCliente,
            C.FKEQUIPAMENTO AS idEquipamento,
            EQ.EQUIPAMENTO AS nomeEquipamento,
            C.DEFEITORECLAMADO AS defeitoReclamado,
            C.FKSTATUS AS idStatus,
            S.NOMESTATUS AS nomeStatus,
            C.FKTECNICO AS idTecnicoResponsavel,
            T.NMTECNICO AS nomeTecnicoResponsavel,
            C.DATACAD AS dataCadastro,
            C.DATAATU AS dataAtualizacao,
            C.DATACONSERTO AS dataConserto,
            C.HORA AS hora
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
          resolve(result || []);
        });
      });
    });
  },

  // ------------------ UPDATE ------------------
  update(id, osData) {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `
          UPDATE TBCONSERTO SET
            FKCLIENTE = ?,
            FKTECNICO = ?,
            FKEQUIPAMENTO = ?,
            FKSTATUS = ?,
            OBS = ?,
            NSERIE = ?,
            DEFEITORECLAMADO = ?,
            LOCALATENDIMENTO = ?,
            TIPOCONS = ?,
            SITUACAO = ?,
            DATACONSERTO = ?,
            HORA = ?,
            DATAATU = ?
          WHERE PKCONSERTO = ?
        `;

        const params = [
          osData.idCliente,
          osData.idTecnico,
          osData.idEquipamento,
          osData.idStatus,
          osData.observacao,
          osData.numeroSerie,
          osData.defeitoReclamado,
          osData.localAtendimento,
          osData.tipoConserto,
          osData.situacao,
          osData.dataConserto,
          osData.hora,
          osData.dataAtualizacao,
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

  // ------------------ DELETE ------------------
  delete(id) {
    return new Promise((resolve, reject) => {
      getConnection((err, db) => {
        if (err) return reject(err);

        const query = `DELETE FROM TBCONSERTO WHERE PKCONSERTO = ?`;

        db.query(query, [id], (qErr) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve(true);
        });
      });
    });
  }

};
