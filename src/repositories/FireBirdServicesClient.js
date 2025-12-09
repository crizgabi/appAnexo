import { getConnection } from "../db/fireBird.js";
import Service from "../models/ServiceModel.js";

export const FireBirdServicesClient = {
    getServicesByDescription: async (description, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
        SELECT
          PKCODSER,
          DESCRICAO,
          NOMESERVICO,
          REFERENCIA,
          VALOR
        FROM TBSERVICO
        WHERE UPPER(DESCRICAO) LIKE UPPER(?)
        ORDER BY PKCODSER
      `;

                const params = [`%${description}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },

    getServicesByReference: async (reference, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
        SELECT
          PKCODSER,
          DESCRICAO,
          NOMESERVICO,
          REFERENCIA,
          VALOR
        FROM TBSERVICO
        WHERE UPPER(REFERENCIA) LIKE UPPER(?)
        ORDER BY PKCODSER
      `;

                const params = [`%${reference}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },

    getServicesByName: async (name, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
        SELECT
          PKCODSER,
          DESCRICAO,
          NOMESERVICO,
          REFERENCIA,
          VALOR
        FROM TBSERVICO
        WHERE UPPER(NOMESERVICO) LIKE UPPER(?)
        ORDER BY PKCODSER
      `;

                const params = [`%${name}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },

    getServicesByPrimaryKey: async (serviceId, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
        SELECT
          PKCODSER,
          DESCRICAO,
          NOMESERVICO,
          REFERENCIA,
          VALOR
        FROM TBSERVICO
        WHERE UPPER(PKCODSER) LIKE UPPER(?)
        ORDER BY PKCODSER
      `;

                const params = [`%${serviceId}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },

    getServiceDetails: async (serviceId, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
        SELECT
          PKCODSER,
          DESCRICAO,
          NOMESERVICO,
          REFERENCIA,
          VALOR
        FROM TBSERVICO
        WHERE PKCODSER = ?
      `;

                db.query(query, [serviceId], (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result[0] || null);
                });
            });
        });
    },

    getAllServices: async (dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
                SELECT
                PKCODSER,
                DESCRICAO,
                NOMESERVICO,
                REFERENCIA,
                VALOR
                FROM TBSERVICO
                ORDER BY PKCODSER
                `;

                db.query(query, [], (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result || []);
                });
            });
        });
    },
};