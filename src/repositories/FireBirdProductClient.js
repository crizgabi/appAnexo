import { getConnection } from "../db/fireBird.js";
import Product from "../models/ProductModel.js";

export const FireBirdProductClient = {
    getProductByBarcode: async (barcode, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
          SELECT
            p.PKCODPROD,
            p.STATUS,
            p.REFERENCIA,
            p.CODBARRAS,
            p.NOME,
            p.OBSERVACAO,
            p.IMAGEMPRINCIPAL,
            p.PRODUTOESPECIFICO,
            p.TIPOITEM,
            p.PESOLIQ,
            p.PESOBRUTO,
            p.ESTOQUEMIN,
            p.ESTOQUEMAX,
            p.AGILIZARESTOQUE,
            p.ESTOQUEATU,
            p.DESCONTOMAXIMO,
            p.VALORVENDA,
            p.FKCODUNI,
            u.NOME AS NOMEUNIDADE,
            u.SIGLA,
            p.FKCODCAT,
            c.NOME AS NOMECATEGORIA,
            p.FKCODMARCA,
            m.NOME AS NOMEMARCA
          FROM TBPRODUTO p
          LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
          LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
          LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
          WHERE UPPER(p.CODBARRAS) LIKE UPPER(?)
          ORDER BY p.PKCODPROD
        `;

                const params = [`%${barcode}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);
                    resolve(result || []);
                });
            });
        });
    },

    getProductByName: async (name, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
          SELECT
            p.PKCODPROD,
            p.STATUS,
            p.REFERENCIA,
            p.CODBARRAS,
            p.NOME,
            p.OBSERVACAO,
            p.IMAGEMPRINCIPAL,
            p.PRODUTOESPECIFICO,
            p.TIPOITEM,
            p.PESOLIQ,
            p.PESOBRUTO,
            p.ESTOQUEMIN,
            p.ESTOQUEMAX,
            p.AGILIZARESTOQUE,
            p.ESTOQUEATU,
            p.DESCONTOMAXIMO,
            p.VALORVENDA,
            p.FKCODUNI,
            u.NOME AS NOMEUNIDADE,
            u.SIGLA,
            p.FKCODCAT,
            c.NOME AS NOMECATEGORIA,
            p.FKCODMARCA,
            m.NOME AS NOMEMARCA
          FROM TBPRODUTO p
          LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
          LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
          LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
          WHERE UPPER(p.NOME) LIKE UPPER(?)
          ORDER BY p.PKCODPROD
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

    getProductByReference: async (reference, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
          SELECT
            p.PKCODPROD,
            p.STATUS,
            p.REFERENCIA,
            p.CODBARRAS,
            p.NOME,
            p.OBSERVACAO,
            p.IMAGEMPRINCIPAL,
            p.PRODUTOESPECIFICO,
            p.TIPOITEM,
            p.PESOLIQ,
            p.PESOBRUTO,
            p.ESTOQUEMIN,
            p.ESTOQUEMAX,
            p.AGILIZARESTOQUE,
            p.ESTOQUEATU,
            p.DESCONTOMAXIMO,
            p.VALORVENDA,
            p.FKCODUNI,
            u.NOME AS NOMEUNIDADE,
            u.SIGLA,
            p.FKCODCAT,
            c.NOME AS NOMECATEGORIA,
            p.FKCODMARCA,
            m.NOME AS NOMEMARCA
          FROM TBPRODUTO p
          LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
          LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
          LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
          WHERE UPPER(p.REFERENCIA) LIKE UPPER(?)
          ORDER BY p.PKCODPROD
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

    getProductByPrimaryKey: async (productId, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
          SELECT
            p.PKCODPROD,
            p.STATUS,
            p.REFERENCIA,
            p.CODBARRAS,
            p.NOME,
            p.OBSERVACAO,
            p.IMAGEMPRINCIPAL,
            p.PRODUTOESPECIFICO,
            p.TIPOITEM,
            p.PESOLIQ,
            p.PESOBRUTO,
            p.ESTOQUEMIN,
            p.ESTOQUEMAX,
            p.AGILIZARESTOQUE,
            p.ESTOQUEATU,
            p.DESCONTOMAXIMO,
            p.VALORVENDA,
            p.FKCODUNI,
            u.NOME AS NOMEUNIDADE,
            u.SIGLA,
            p.FKCODCAT,
            c.NOME AS NOMECATEGORIA,
            p.FKCODMARCA,
            m.NOME AS NOMEMARCA
          FROM TBPRODUTO p
          LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
          LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
          LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
          WHERE UPPER(p.PKCODPROD) LIKE UPPER(?)
          ORDER BY p.PKCODPROD
        `;

                const params = [`%${productId}%`];

                db.query(query, params, (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);
                    resolve(result || []);
                });
            });
        });
    },

    getProductDetails: async (productId, dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
                SELECT
                    p.PKCODPROD,
                    p.STATUS,
                    p.CODBARRAS,
                    p.REFERENCIA,
                    p.NOME,
                    p.OBSERVACAO,
                    p.ESTOQUEATU,
                    p.ESTOQUEMIN,
                    p.ESTOQUEMAX,
                    p.VALORVENDA,
                    p.FKCODUNI,
                    u.NOME AS NOMEUNIDADE,
                    u.SIGLA,
                    p.FKCODCAT,
                    c.NOME AS NOMECATEGORIA,
                    p.FKCODMARCA,
                    m.NOME AS NOMEMARCA
                FROM TBPRODUTO p
                LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
                LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
                LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
                WHERE p.PKCODPROD = ?
            `;

                db.query(query, [productId], (qErr, result) => {
                    db.detach();
                    if (qErr) return reject(qErr);

                    resolve(result[0] || null);
                });
            });
        });
    },

    getAllProducts: async (dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
                if (err) return reject(err);

                const query = `
                SELECT
                    p.PKCODPROD,
                    p.STATUS,
                    p.REFERENCIA,
                    p.CODBARRAS,
                    p.NOME,
                    p.OBSERVACAO,
                    p.IMAGEMPRINCIPAL,
                    p.PRODUTOESPECIFICO,
                    p.TIPOITEM,
                    p.PESOLIQ,
                    p.PESOBRUTO,
                    p.ESTOQUEMIN,
                    p.ESTOQUEMAX,
                    p.AGILIZARESTOQUE,
                    p.ESTOQUEATU,
                    p.DESCONTOMAXIMO,
                    p.VALORVENDA,
                    p.FKCODUNI,
                    u.NOME AS NOMEUNIDADE,
                    u.SIGLA,
                    p.FKCODCAT,
                    c.NOME AS NOMECATEGORIA,
                    p.FKCODMARCA,
                    m.NOME AS NOMEMARCA
                FROM TBPRODUTO p
                LEFT JOIN TBUNIDADE u ON p.FKCODUNI = u.PKCODUNI
                LEFT JOIN TBCATEGORIA c ON p.FKCODCAT = c.PKCODCAT
                LEFT JOIN TBMARCA m ON p.FKCODMARCA = m.PKCODMARC
                ORDER BY p.PKCODPROD
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