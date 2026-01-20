import { getConnection } from "../db/fireBird.js";

export const FireBirdEquipmentClient = {
    create(equip, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const now = new Date();

                const getNextIdQuery = "SELECT MAX(PKEQUIPAMENTO) AS MAX_ID FROM TBEQUIPAMENTO";
                conn.query(getNextIdQuery, (err, idRes) => {
                    if (err) {
                        conn.detach();
                        return reject(err);
                    }

                    const nextId =
                        idRes && idRes[0] && idRes[0].MAX_ID
                            ? Number(idRes[0].MAX_ID) + 1
                            : 1;

                    const query = `
            INSERT INTO TBEQUIPAMENTO (
              PKEQUIPAMENTO, FKCLIENTE, DATACAD, DATAATU, EQUIPAMENTO, FABRICANTE,
              MODELO, NSERIE, LOCALEQUIPAMENTO, CODINTERNO, NUMPATRIMONIO, OBS, MARCA
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

                    const params = [
                        nextId,
                        equip.idCliente,
                        now,
                        now,
                        equip.nomeEquipamento,
                        equip.fabricante || "",
                        equip.modelo || "",
                        equip.numeroSerie || "",
                        equip.localInstalacao || "",
                        equip.codigoInterno || "",
                        equip.numeroPatrimonio || "",
                        equip.descricao || "",
                        equip.marca || "",
                    ];

                    conn.query(query, params, (err2) => {
                        conn.detach();
                        if (err2) return reject(err2);
                        resolve({
                            idEquipamento: nextId,
                            dataCadastro: now,
                            dataAtualizacao: now,
                        });
                    });
                });
            });
        });
    },

    findAll(dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = `
        SELECT
            e.PKEQUIPAMENTO,
            e.FKCLIENTE,
            c.PKCODCLI AS CLIENTE_PKCODCLI,
            c.RAZAOSOCIAL AS CLIENTE_NOME,
            e.EQUIPAMENTO,
            e.MARCA,
            e.MODELO,
            e.NSERIE,
            e.LOCALEQUIPAMENTO,
            e.FABRICANTE,
            e.CODINTERNO,
            e.NUMPATRIMONIO,
            e.OBS,
            e.DATACAD,
            e.DATAATU
        FROM TBEQUIPAMENTO e
        LEFT JOIN TBCLIENTE c ON c.PKCODCLI = e.FKCLIENTE
        ORDER BY e.PKEQUIPAMENTO
      `;

                conn.query(query, (err, rows) => {
                    conn.detach();
                    if (err) return reject(err);

                    resolve(rows || []);
                });
            });
        });
    },

    findById(id, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = `
          SELECT
            PKEQUIPAMENTO, FKCLIENTE, EQUIPAMENTO, MARCA, MODELO, NSERIE,
            LOCALEQUIPAMENTO, FABRICANTE, CODINTERNO, NUMPATRIMONIO, OBS,
            DATACAD, DATAATU
          FROM TBEQUIPAMENTO
          WHERE PKEQUIPAMENTO = ?
        `;

                conn.query(query, [id], (err, res) => {
                    conn.detach();
                    if (err) return reject(err);
                    const row = res && res[0];
                    if (!row) return resolve(null);

                    resolve(row || []);
                });
            });
        });
    },

    findByCliente(idCliente, dbEnvKey) {
        return new Promise((resolve, reject) => {
            const clienteId = Number(idCliente);
            if (isNaN(clienteId)) {
                return reject(new Error("idCliente inválido: deve ser numérico"));
            }

            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const query = `
          SELECT
            PKEQUIPAMENTO, FKCLIENTE, EQUIPAMENTO, MARCA, MODELO, NSERIE,
            LOCALEQUIPAMENTO, FABRICANTE, CODINTERNO, NUMPATRIMONIO, OBS,
            DATACAD, DATAATU
          FROM TBEQUIPAMENTO
          WHERE FKCLIENTE = ?
          ORDER BY PKEQUIPAMENTO
        `;

                conn.query(query, [clienteId], (err, result) => {
                    if (err) {
                        conn.detach();
                        return reject(err);
                    };

                    conn.detach();
                    resolve(result);
                });
            });
        });
    },

    update(id, equipmentData, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                const now = new Date();
                const query = `
          UPDATE TBEQUIPAMENTO
          SET
            FKCLIENTE = ?,
            EQUIPAMENTO = ?,
            MARCA = ?,
            MODELO = ?,
            NSERIE = ?,
            LOCALEQUIPAMENTO = ?,
            FABRICANTE = ?,
            CODINTERNO = ?,
            NUMPATRIMONIO = ?,
            OBS = ?,
            DATAATU = ?
          WHERE PKEQUIPAMENTO = ?
        `;

                const params = [
                    equipmentData.idCliente,
                    equipmentData.nomeEquipamento,
                    equipmentData.marca,
                    equipmentData.modelo,
                    equipmentData.numeroSerie,
                    equipmentData.localInstalacao,
                    equipmentData.fabricante,
                    equipmentData.codigoInterno,
                    equipmentData.numeroPatrimonio,
                    equipmentData.descricao,
                    equipmentData.now,
                    id,
                ];

                conn.query(query, params, (err2) => {
                    conn.detach();
                    if (err2) return reject(err2);
                    resolve({ idEquipamento: id, dataAtualizacao: now });
                });
            });
        });
    },

    delete(id, dbEnvKey) {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, conn) => {
                if (err) return reject(err);

                conn.query(
                    "DELETE FROM TBEQUIPAMENTO WHERE PKEQUIPAMENTO = ?",
                    [id],
                    (err2) => {
                        conn.detach();
                        if (err2) return reject(err2);
                        resolve(true);
                    }
                );
            });
        });
    },
};