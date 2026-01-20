import { getConnection } from "../db/fireBird.js";

export const FireBirdServiceOSClient = {
    create(item, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const getServicoQuery = `
                    SELECT COALESCE(NOMESERVICO, DESCRICAO) AS NOME_SERVICO 
                    FROM TBSERVICO 
                    WHERE PKCODSER = ?
                `;

                conn.query(getServicoQuery, [item.idServico], (errServ, resServ) => {
                    if (errServ) {
                        conn.detach();
                        return reject(errServ);
                    }

                    const nomeServico = resServ?.[0]?.NOME_SERVICO ?? "";

                    const getNextOrderQuery = `
                        SELECT COALESCE(MAX(ORDEM), 0) AS MAX_ORDEM
                        FROM TBRELCONSERTOSERV
                        WHERE FKCONSERTO = ?
                    `;

                    conn.query(getNextOrderQuery, [item.idConserto], (errOrd, resOrd) => {
                        if (errOrd) {
                            conn.detach();
                            return reject(errOrd);
                        }

                        const nextOrder = (resOrd?.[0]?.MAX_ORDEM ?? 0) + 1;
                  
                        const getNextIdQuery =
                            "SELECT MAX(PKCODCONSERV) AS MAX_ID FROM TBRELCONSERTOSERV";

                        conn.query(getNextIdQuery, (errId, resId) => {
                            if (errId) {
                                conn.detach();
                                return reject(errId);
                            }

                            const nextId = resId?.[0]?.MAX_ID
                                ? Number(resId[0].MAX_ID) + 1
                                : 1;

                            const valorTotal = item.quantidade * item.valorUnitario;
                        
                            const insertQuery = `
                                INSERT INTO TBRELCONSERTOSERV (
                                    PKCODCONSERV,
                                    FKCONSERTO,
                                    FKSERVICO,
                                    FKTECNICO,
                                    NMSERVICO,
                                    QUANT,
                                    VALOR,
                                    VALORTOTAL,
                                    FKCODUSU,
                                    ORDEM,
                                    OBS
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;

                            const params = [
                                nextId,
                                item.idConserto,
                                item.idServico,
                                item.idTecnico,
                                nomeServico, 
                                item.quantidade,
                                item.valorUnitario,
                                valorTotal,
                                item.idUsuario,
                                nextOrder,
                                item.observacao ?? null
                            ];

                            conn.query(insertQuery, params, (errInsert) => {
                                conn.detach();
                                if (errInsert) return reject(errInsert);

                                resolve({
                                    idItemServico: nextId,
                                    idConserto: item.idConserto,
                                    idTecnico: item.idTecnico,
                                    idServico: item.idServico,
                                    descricaoServico: nomeServico, 
                                    quantidade: item.quantidade,
                                    valorUnitario: item.valorUnitario,
                                    valorTotal,
                                    ordem: nextOrder,
                                    observacao: item.observacao,
                                    message: "Serviço adicionado com sucesso à Ordem de Serviço."
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    getAllByOS(idConserto, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = `
                    SELECT
                      r.PKCODCONSERV,
                      r.FKSERVICO,
                      r.FKTECNICO,
                      COALESCE(r.NMSERVICO, s.NOMESERVICO, s.DESCRICAO) AS NOME_SERVICO,
                      r.QUANT,
                      r.VALOR,
                      r.VALORTOTAL,
                      r.ORDEM,
                      r.OBS
                    FROM TBRELCONSERTOSERV r
                    LEFT JOIN TBSERVICO s ON s.PKCODSER = r.FKSERVICO
                    WHERE r.FKCONSERTO = ?
                    ORDER BY r.ORDEM
                  `;

                conn.query(query, [idConserto], (err2, rows) => {
                    conn.detach();
                    if (err2) return reject(err2);

                    const mappedRows = rows.map(row => ({
                        idItemServico: row.PKCODCONSERV,
                        idTecnico: row.IDTECNICO || row.FKTECNICO,
                        idServico: row.FKSERVICO,
                        descricaoServico: row.NOME_SERVICO,
                        quantidade: row.QUANT,
                        valorUnitario: row.VALOR,
                        valorTotal: row.VALORTOTAL,
                        ordem: row.ORDEM,
                        observacao: row.OBS
                    }));

                    resolve(mappedRows);
                });
            });
        });
    },

    delete(idItem, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                conn.query(
                    "DELETE FROM TBRELCONSERTOSERV WHERE PKCODCONSERV = ?",
                    [idItem],
                    (err2) => {
                        conn.detach();
                        if (err2) return reject(err2);
                        resolve(true);
                    }
                );
            });
        });
    }

};