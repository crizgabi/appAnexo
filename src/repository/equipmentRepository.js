import { getConnection } from "../db/fireBird.js";

export const EquipamentRepository = {
  create(equip) {
    return new Promise((resolve, reject) => {
      getConnection((err, conn) => {
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
            equip.idCliente || null,
            now,
            now,
            equip.nomeEquipamento || null,
            equip.fabricante || null,
            equip.modelo || null,
            equip.numeroSerie || null,
            equip.localInstalacao || null,
            equip.codigoInterno || null,
            equip.numeroPatrimonio || null,
            equip.descricao || null,
            equip.marca || null,
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

  findAll() {
  return new Promise((resolve, reject) => {
    getConnection((err, conn) => {
      if (err) return reject(err);

      const query = `
        SELECT
          e.PKEQUIPAMENTO,
          e.FKCLIENTE,
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
          e.DATAATU,
          c.RAZAOSOCIAL AS CLIENTE_NOME
        FROM TBEQUIPAMENTO e
        LEFT JOIN TBCLIENTE c ON c.PKCODCLI = e.FKCLIENTE
        ORDER BY e.PKEQUIPAMENTO
      `;

      conn.query(query, (err, rows) => {
        conn.detach();
        if (err) return reject(err);

        const equipamentos = (rows || []).map((row) => ({
          idEquipamento: row.PKEQUIPAMENTO,
          idCliente: row.FKCLIENTE,
          clienteNome: row.CLIENTE_NOME || null,
          nomeEquipamento: row.EQUIPAMENTO,
          marca: row.MARCA,
          modelo: row.MODELO,
          numeroSerie: row.NSERIE,
          localInstalacao: row.LOCALEQUIPAMENTO,
          fabricante: row.FABRICANTE,
          codigoInterno: row.CODINTERNO,
          numeroPatrimonio: row.NUMPATRIMONIO,
          descricao: row.OBS,
          dataCadastro: row.DATACAD,
          dataAtualizacao: row.DATAATU,
        }));

        resolve(equipamentos);
      });
    });
  });
},


  findById(id) {
    return new Promise((resolve, reject) => {
      getConnection((err, conn) => {
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

          resolve({
            idEquipamento: row.PKEQUIPAMENTO,
            idCliente: row.FKCLIENTE,
            nomeEquipamento: row.EQUIPAMENTO,
            marca: row.MARCA,
            modelo: row.MODELO,
            numeroSerie: row.NSERIE,
            localInstalacao: row.LOCALEQUIPAMENTO,
            fabricante: row.FABRICANTE,
            codigoInterno: row.CODINTERNO,
            numeroPatrimonio: row.NUMPATRIMONIO,
            descricao: row.OBS,
            dataCadastro: row.DATACAD,
            dataAtualizacao: row.DATAATU,
          });
        });
      });
    });
  },

  findByCliente(idCliente) {
    return new Promise((resolve, reject) => {
      // Garante que o idCliente seja número
      const clienteId = Number(idCliente);
      if (isNaN(clienteId)) {
        return reject(new Error("idCliente inválido: deve ser numérico"));
      }

      getConnection((err, conn) => {
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
          }

          // Mapeia o resultado
          const equipamentos = result.map(equip => ({
            idEquipamento: equip.PKEQUIPAMENTO,
            idCliente: equip.FKCLIENTE,
            nomeEquipamento: equip.EQUIPAMENTO,
            marca: equip.MARCA,
            modelo: equip.MODELO,
            numeroSerie: equip.NSERIE,
            localInstalacao: equip.LOCALEQUIPAMENTO,
            fabricante: equip.FABRICANTE,
            codigoInterno: equip.CODINTERNO,
            numeroPatrimonio: equip.NUMPATRIMONIO,
            descricao: equip.OBS,
            dataCadastro: equip.DATACAD,
            dataAtualizacao: equip.DATAATU
          }));

          conn.detach();
          resolve(equipamentos);
        });
      });
    });
  },

  update(id, equip) {
    return new Promise((resolve, reject) => {
      getConnection((err, conn) => {
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
          equip.idCliente || null,
          equip.nomeEquipamento || null,
          equip.marca || null,
          equip.modelo || null,
          equip.numeroSerie || null,
          equip.localInstalacao || null,
          equip.fabricante || null,
          equip.codigoInterno || null,
          equip.numeroPatrimonio || null,
          equip.descricao || null,
          now,
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

  delete(id) {
    return new Promise((resolve, reject) => {
      getConnection((err, conn) => {
        if (err) return reject(err);

        const deletedAt = new Date();

        conn.query(
          "DELETE FROM TBEQUIPAMENTO WHERE PKEQUIPAMENTO = ?",
          [id],
          (err2) => {
            conn.detach();
            if (err2) return reject(err2);
            resolve({
              sucess: true,
              deletedAt
            });
          }
        );
      });
    });
  },
};
