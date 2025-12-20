import { getConnection } from "../db/fireBird.js";

export const FireBirdChecklistModeloClient = {
    listChecklists: async (dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
                SELECT
                    PKCHECKLIST,
                    DESCRICAO,
                    ATIVO
                FROM TBCHECKLIST
                ORDER BY PKCHECKLIST
                `;

                db.query(query, [], (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },

    listChecklistItens: async (dbEnvKey, idChecklist) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
                SELECT
                    PKCHECKLISTITEM,
                    FKCHECKLIST,
                    DESCRICAOITEM,
                    ORDEM,
                    TIPO
                FROM TBCHECKLISTITEM
                WHERE FKCHECKLIST = ?
                ORDER BY ORDEM
                `;

                const params = [idChecklist];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },
};
