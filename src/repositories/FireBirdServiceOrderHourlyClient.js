import { getConnection } from "../db/fireBird.js";

export const FireBirdServiceOrderHourlyClient = {

    // LISTAR horários de uma OS
    findByServiceOrder(idConserto, dbEnvKey) {
        return new Promise((resolve, reject) => {
            const consertoId = Number(idConserto);
            if (isNaN(consertoId)) {
                return reject(new Error("idConserto inválido"));
            }

            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = `
                    SELECT
                        H.PKCODHORARIO,
                        H.FKCONSERTO,
                        H."DATA",
                        H.INICIO,
                        H."FINAL",
                        H.ORDEM,
                        H.FKTECNICO,
                        H.NMTECNICO,
                        H.FKCODUSU,
                        H.TOTALMINUTO,
                        H.TOTAL
                    FROM TBRELCONSERTOHORARIO H
                    WHERE H.FKCONSERTO = ?
                    ORDER BY H."DATA", H.INICIO
                `;

                conn.query(query, [consertoId], (err2, rows) => {
                    conn.detach();
                    if (err2) return reject(err2);
                    resolve(rows || []);
                });
            });
        });
    },

    // CRIAR horário
    create(hourly, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                // 1. Buscar nome do técnico na TBTECNICO usando PKTECNICO (ajustado conforme seu CREATE TABLE)
                const getTecnicoQuery = "SELECT NMTECNICO FROM TBTECNICO WHERE PKTECNICO = ?";
                conn.query(getTecnicoQuery, [hourly.idTecnico], (errTec, resTec) => {
                    if (errTec) {
                        conn.detach();
                        return reject(errTec);
                    }

                    const nomeTecnico = resTec?.[0]?.NMTECNICO ?? "Técnico não encontrado";

                    // 2. Buscar próxima ORDEM
                    const getOrderQuery = "SELECT COALESCE(MAX(ORDEM), 0) AS MAX_ORDEM FROM TBRELCONSERTOHORARIO WHERE FKCONSERTO = ?";
                    conn.query(getOrderQuery, [hourly.idConserto], (errOrd, resOrd) => {
                        if (errOrd) { conn.detach(); return reject(errOrd); }
                        const nextOrder = Number(resOrd[0].MAX_ORDEM) + 1;

                        // 3. Buscar próximo ID Global
                        const getNextIdQuery = "SELECT MAX(PKCODHORARIO) AS MAX_ID FROM TBRELCONSERTOHORARIO";
                        conn.query(getNextIdQuery, (errId, resId) => {
                            if (errId) { conn.detach(); return reject(errId); }
                            const nextId = resId?.[0]?.MAX_ID ? Number(resId[0].MAX_ID) + 1 : 1;

                            // 4. Inserir na TBRELCONSERTOHORARIO
                            const insertQuery = `
                                INSERT INTO TBRELCONSERTOHORARIO (
                                    PKCODHORARIO, FKCONSERTO, "DATA", INICIO, "FINAL",
                                    ORDEM, FKTECNICO, NMTECNICO, FKCODUSU, 
                                    TOTALMINUTO, TOTAL
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;

                            const params = [
                                nextId,
                                hourly.idConserto,
                                hourly.data,
                                hourly.horaInicio,
                                hourly.horaFim,
                                nextOrder,
                                hourly.idTecnico, // ID que veio do Body
                                nomeTecnico,      // Nome que acabamos de buscar
                                hourly.usuarioId,
                                hourly.totalMinutos,
                                hourly.totalFormatado
                            ];

                            conn.query(insertQuery, params, (err3) => {
                                conn.detach();
                                if (err3) return reject(err3);

                                resolve({
                                    idHorario: nextId,
                                    idConserto: hourly.idConserto,
                                    data: hourly.data,
                                    horaInicio: hourly.horaInicio,
                                    horaFim: hourly.horaFim,
                                    idTecnico: hourly.idTecnico,
                                    tecnicoNome: nomeTecnico
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    // REMOVER horário
    delete(idHorario, idConserto, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = "DELETE FROM TBRELCONSERTOHORARIO WHERE PKCODHORARIO = ? AND FKCONSERTO = ?";
                conn.query(query, [Number(idHorario), Number(idConserto)], (err2) => {
                    conn.detach();
                    if (err2) return reject(err2);
                    resolve(true);
                });
            });
        });
    }
};