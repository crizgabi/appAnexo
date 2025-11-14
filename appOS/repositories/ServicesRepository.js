import { getConnection } from "../../src/db/fireBird.js";
import Service from "../models/ServiceModel.js";

export const ServicesRepository = {
    getServiceByDescription: async (description) => {
        return new Promise((resolve, reject) => {
            getConnection((err, db) => {
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

    getServiceByReference: async (reference) => {
        return new Promise((resolve, reject) => {
            getConnection((err, db) => {
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

    getServiceByName: async (name) => {
        return new Promise((resolve, reject) => {
            getConnection((err, db) => {
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

    getServiceByPrimaryKey: async (serviceId) => {
        return new Promise((resolve, reject) => {
            getConnection((err, db) => {
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

    getServiceDetails: async (serviceId) => {
        return new Promise((resolve, reject) => {
            getConnection((err, db) => {
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
};
