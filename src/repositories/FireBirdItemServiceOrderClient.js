import { getConnection } from "../db/fireBird.js";

export const FireBirdItemServiceOrderClient = {
    create(item, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const getProdutoQuery = `
                    SELECT NOME FROM TBPRODUTO WHERE PKCODPROD = ? 
                `;

                conn.query(getProdutoQuery, [item.idProduto], (errProduto, resProduto) => {
                    if (errProduto) {
                        conn.detach();
                        return reject(errProduto);
                    }

                    const nomeProduto = resProduto?.[0]?.NOME ?? "";

                    const getNextIdQuery = "SELECT MAX(PKRELCONSERTO) AS MAX_ID FROM TBRELCONSERTO";
                    conn.query(getNextIdQuery, (errId, resId) => {
                        if (errId) {
                            conn.detach();
                            return reject(errId);
                        }

                        const nextId = resId?.[0]?.MAX_ID ? Number(resId[0].MAX_ID) + 1 : 1;

                        const valorTotal = item.quantidade * item.valorUnitario;

                        const query = `
                            INSERT INTO TBRELCONSERTO (
                                PKRELCONSERTO, FKCONSERTO, FKPRODUTO, DESCRICAO, QUANT, VALORUNIT,
                                VALORTOTAL, FKCODUSU, ORDEM, UNIDADE, OBS
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;

                        const params = [
                            nextId,
                            item.idConserto,
                            item.idProduto,
                            nomeProduto,
                            item.quantidade,
                            item.valorUnitario,
                            valorTotal,
                            item.idUsuario,
                            item.ordem ?? null,
                            item.unidade ?? "",
                            item.observacao ?? null
                        ];

                        conn.query(query, params, (errInsert) => {
                            conn.detach();
                            if (errInsert) return reject(errInsert);

                            resolve({
                                idItemProduto: nextId,
                                idConserto: item.idConserto,
                                idProduto: item.idProduto,
                                observacao: item.observacao,
                                descricaoProduto: nomeProduto,
                                unidade: item.unidade,
                                quantidade: item.quantidade,
                                valorUnitario: item.valorUnitario,
                                valorTotal,
                                message: "Produto adicionado com sucesso à Ordem de Serviço."
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
                    r.PKRELCONSERTO AS idItemProduto,
                    r.FKPRODUTO AS idProduto,                  
                    COALESCE(p.NOME, r.DESCRICAO) AS descricaoProduto, 
                    r.UNIDADE AS unidade, 
                    r.QUANT,
                    r.VALORUNIT,
                    r.VALORTOTAL,
                    r.OBS AS observacao 
                FROM TBRELCONSERTO r
                LEFT JOIN TBPRODUTO p ON p.PKCODPROD = r.FKPRODUTO
                WHERE r.FKCONSERTO = ?
                ORDER BY r.PKRELCONSERTO
        `;

                conn.query(query, [idConserto], (err2, rows) => {
                    conn.detach();
                    if (err2) return reject(err2);
                    const mappedRows = rows.map(row => ({
                        idItemProduto: row.IDITEMPRODUTO || row.PKRELCONSERTO,
                        idProduto: row.IDPRODUTO || row.FKPRODUTO,
                        descricaoProduto: row.DESCRICAOPRODUTO || row.NOME || row.DESCRICAO,
                        observacao: row.OBSERVACAO || row.OBS,
                        unidade: row.UNIDADE,
                        quantidade: row.QUANT,
                        valorUnitario: row.VALORUNIT ?? row.VALOR_UNIT ?? row.VALORUNITARIO,
                        valorTotal: row.VALORTOTAL,
                    }));

                    resolve(mappedRows || []);
                });
            });
        });
    },

    delete(idItem, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                conn.query("DELETE FROM TBRELCONSERTO WHERE PKRELCONSERTO = ?", [idItem], (err2) => {
                    conn.detach();
                    if (err2) return reject(err2);
                    resolve(true);
                });
            });
        });
    }
};
