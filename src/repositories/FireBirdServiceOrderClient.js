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
          os.dataCadastro ? os.dataCadastro : fbDateTimeNow(),
          os.dataAtualizacao ? os.dataAtualizacao : fbDateTimeNow()
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
          C.PKCONSERTO,
          C.CODIDENTIFICADOR,
          C.FKCLIENTE,
          CL.RAZAOSOCIAL,
          C.FKEQUIPAMENTO,
          EQ.EQUIPAMENTO,
          C.DEFEITORECLAMADO,
          C.FKSTATUS,
          S.NOMESTATUS,
          C.FKTECNICO,
          T.NMTECNICO,
          C.DATACONSERTO,
          C.HORA,
          C.OBS,
          C.DATACAD,
          C.DATAATU,
          A.ARQASS1,
          A.ARQASS2
        FROM TBCONSERTO C
        LEFT JOIN TBCLIENTE CL ON CL.PKCODCLI = C.FKCLIENTE
        LEFT JOIN TBEQUIPAMENTO EQ ON EQ.PKEQUIPAMENTO = C.FKEQUIPAMENTO
        LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
        LEFT JOIN TBSTATUS S ON S.PKSTATUS = C.FKSTATUS
        LEFT JOIN TBASSINATURA A ON A.FKCONSERTO = C.PKCONSERTO
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

  getById: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        SELECT
          C.PKCONSERTO,
          C.CODIDENTIFICADOR,
          C.FKCLIENTE,
          CL.RAZAOSOCIAL,
          C.FKEQUIPAMENTO,
          EQ.EQUIPAMENTO,
          C.DEFEITORECLAMADO,
          C.FKSTATUS,
          S.NOMESTATUS,
          C.FKTECNICO,
          T.NMTECNICO,
          C.DATACONSERTO,
          C.HORA,
          C.OBS,
          C.DATACAD,
          C.DATAATU,
          A.ARQASS1,
          A.ARQASS2
        FROM TBCONSERTO C
        LEFT JOIN TBCLIENTE CL ON CL.PKCODCLI = C.FKCLIENTE
        LEFT JOIN TBEQUIPAMENTO EQ ON EQ.PKEQUIPAMENTO = C.FKEQUIPAMENTO
        LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
        LEFT JOIN TBSTATUS S ON S.PKSTATUS = C.FKSTATUS
        LEFT JOIN TBASSINATURA A ON A.FKCONSERTO = C.PKCONSERTO
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

  getByUser: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        SELECT
          C.PKCONSERTO,
          C.CODIDENTIFICADOR,
          C.FKCLIENTE,
          CL.RAZAOSOCIAL,
          C.FKEQUIPAMENTO,
          EQ.EQUIPAMENTO,
          C.DEFEITORECLAMADO,
          C.FKSTATUS,
          S.NOMESTATUS,
          C.FKTECNICO,
          T.NMTECNICO,
          C.DATACONSERTO,
          C.HORA,
          C.OBS,
          C.DATACAD,
          C.DATAATU,
          A.ARQASS1,
          A.ARQASS2
        FROM TBCONSERTO C
        LEFT JOIN TBCLIENTE CL ON CL.PKCODCLI = C.FKCLIENTE
        LEFT JOIN TBEQUIPAMENTO EQ ON EQ.PKEQUIPAMENTO = C.FKEQUIPAMENTO
        LEFT JOIN TBTECNICO T ON T.PKTECNICO = C.FKTECNICO
        LEFT JOIN TBSTATUS S ON S.PKSTATUS = C.FKSTATUS
        LEFT JOIN TBASSINATURA A ON A.FKCONSERTO = C.PKCONSERTO
        WHERE C.FKTECNICO = ?
        ORDER BY C.DATACONSERTO DESC
      `;

        db.query(query, [id], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve((result || []));
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
          os.FKCLIENTE,
          os.FKTECNICO,
          os.FKEQUIPAMENTO,
          os.DEFEITORECLAMADO,
          os.OBS,
          os.DATACONSERTO,
          os.HORA,
          os.DATAATU ?? new Date(),
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

  addSignature: (idConserto, { assinatura1 = null, assinatura2 = null }, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const selectQuery = `SELECT * FROM TBASSINATURA WHERE FKCONSERTO = ?`;
        db.query(selectQuery, [idConserto], (selErr, selResult) => {
          if (selErr) {
            db.detach();
            return reject(selErr);
          }

          if (selResult && selResult.length > 0) {
            const updateQuery = `
            UPDATE TBASSINATURA
            SET ARQASS1 = COALESCE(?, ARQASS1),
                ARQASS2 = COALESCE(?, ARQASS2)
            WHERE FKCONSERTO = ?
          `;
            db.query(updateQuery, [assinatura1, assinatura2, idConserto], (updErr) => {
              db.detach();
              if (updErr) return reject(updErr);
              resolve(true);
            });
          } else {
            const insertQuery = `
            INSERT INTO TBASSINATURA (FKCONSERTO, ARQASS1, ARQASS2)
            VALUES (?, ?, ?)
          `;
            db.query(insertQuery, [idConserto, assinatura1, assinatura2], (insErr) => {
              db.detach();
              if (insErr) return reject(insErr);
              resolve(true);
            });
          }
        });
      });
    });
  },

  getSignature: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const selectQuery = `
        SELECT
          PKASSINATURA,
          FKCONSERTO,
          ARQASS1,
          DESCASS1,
          ARQASS2,
          DESCASS2
        FROM TBASSINATURA
        WHERE FKCONSERTO = ?
      `;

        db.query(selectQuery, [id], (selErr, selResult) => {
          db.detach();

          if (selErr) {
            return reject(selErr);
          }

          if (!selResult || selResult.length === 0) {
            return resolve(null);
          }

          resolve(selResult[0]);
        });
      });
    });
  },

  deleteSignature: (idConserto, tipo, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        let updateQuery;

        if (tipo === "tecnico") {
          updateQuery = `
          UPDATE TBASSINATURA
          SET ARQASS1 = NULL
          WHERE FKCONSERTO = ?
        `;
        } else if (tipo === "cliente") {
          updateQuery = `
          UPDATE TBASSINATURA
          SET ARQASS2 = NULL
          WHERE FKCONSERTO = ?
        `;
        } else {
          db.detach();
          return reject(new Error("Tipo de assinatura inválido"));
        }

        db.query(updateQuery, [idConserto], (updErr, result) => {
          db.detach();

          if (updErr) return reject(updErr);

          resolve(true);
        });
      });
    });
  },

  addImage: (idConserto, idTecnico, fkCodUsu, caminho, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const insertQuery = `
        INSERT INTO TBARQUIVO (
          FKCONSERTO,
          CAMINHO,
          FKTECNICO,
          FKCODUSU,
          TIPO
        )
        VALUES (?, ?, ?, ?, 2)
        `;

        db.query(insertQuery, [idConserto, caminho, idTecnico, fkCodUsu], (insErr, result) => {
          db.detach();
          const pkarquivo = result[0].PKARQUIVO;
          if (insErr) return reject(insErr);
          resolve(true);
        });
      });
    });
  },

  getImages: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const selectQuery = `
        SELECT
          FKCONSERTO,
          PKARQUIVO,
          CAMINHO,
          DESCRICAO,
          FKTECNICO,
          FKCODUSU,
          NOMEARQUIVO,
          DATACAD,
          DATAATU
        FROM TBARQUIVO
        WHERE FKCONSERTO = ?
        ORDER BY PKARQUIVO ASC
      `;

        db.query(selectQuery, [id], (selErr, selResult) => {
          db.detach();

          if (selErr) {
            return reject(selErr);
          }

          if (!selResult || selResult.length === 0) {
            return resolve([]);
          }

          resolve(selResult);
        });
      });
    });
  },

  getImageById: (id, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const query = `
        SELECT
          FKCONSERTO,
          PKARQUIVO,
          CAMINHO,
          DESCRICAO,
          FKTECNICO,
          FKCODUSU,
          NOMEARQUIVO,
          DATACAD,
          DATAATU
        FROM TBARQUIVO
        WHERE PKARQUIVO = ?
      `;

        db.query(query, [id], (qErr, result) => {
          db.detach();
          if (qErr) return reject(qErr);
          resolve((result && result[0]) || null);
        });
      });
    });
  },

  deleteImage: (idConserto, seqImagem, dbEnvKey) => {
    return new Promise((resolve, reject) => {
      getConnection(dbEnvKey, (err, db) => {
        if (err) return reject(err);

        const selectQuery = `
        SELECT PKARQUIVO, FKCONSERTO, CAMINHO, DESCRICAO
        FROM TBARQUIVO
        WHERE FKCONSERTO = ? AND PKARQUIVO = ?
      `;

        db.query(selectQuery, [idConserto, seqImagem], (selErr, selResult) => {
          if (selErr) {
            db.detach();
            return reject(selErr);
          }

          if (!selResult || selResult.length === 0) {
            db.detach();
            return reject(new Error("Imagem não encontrada"));
          }

          const row = selResult[0];

          // 2. remove registro da tabela
          const deleteQuery = `
          DELETE FROM TBARQUIVO
          WHERE PKARQUIVO = ? AND FKCONSERTO = ? AND TIPO = 2
        `;

          db.query(deleteQuery, [seqImagem, idConserto], (delErr) => {
            db.detach();

            if (delErr) return reject(delErr);

            // 3. retorno conforme contrato
            resolve({
              idConserto: row.FKCONSERTO,
              seqImagem: row.PKARQUIVO,
              urlRemovida: row.CAMINHO,
              legenda: row.DESCRICAO,
              dataHoraRemocao: new Date().toISOString(),
              status: "removida"
            });
          });
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
