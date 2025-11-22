import Equipment from "../models/EquipmentModel.js";
import { EquipmentRepository } from "../repositories/EquipmentRepository.js";

export const EquipmentService = {
  async create(data) {
    // Validação básica dos campos obrigatórios
    if (!data.idCliente || !data.nomeEquipamento || !data.marca || !data.modelo || !data.numeroSerie) {
      throw new Error("Campos obrigatórios faltando: idCliente, nomeEquipamento, marca, modelo, numeroSerie");
    }

    const equip = new Equipment(data);
    const result = await EquipmentRepository.create(equip);

    // Retorno conforme o schema esperado (sem imagens por enquanto)
    return {
      idEquipamento: result.idEquipamento,
      pkcodcli: equip.idCliente,
      nomeEquipamento: equip.nomeEquipamento,
      marca: equip.marca,
      modelo: equip.modelo,
      numeroSerie: equip.numeroSerie,
      localInstalacao: equip.localInstalacao,
      fabricante: equip.fabricante,
      codigoInterno: equip.codigoInterno,
      numeroPatrimonio: equip.numeroPatrimonio,
      descricao: equip.descricao,
      dataCadastro: result.dataCadastro,
      dataAtualizacao: result.dataAtualizacao
    };
  },

  async list() {
    // Busca os dados crus do repositório
    const rows = await EquipmentRepository.findAll();

    // Faz o mapeamento dos campos aqui
    return rows.map(row => ({
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
    }));
  },

  async find(id, { expand = [], osLimit = 10, osOffset = 0 } = {}) {
    const equipamento = await EquipmentRepository.findById(id);
    if (!equipamento) throw new Error("Equipamento não encontrado");

    // Expand opcional (ex: historicoOs)
    let historicoOs = null;
    const expandList = Array.isArray(expand)
      ? expand
      : String(expand).split(",").map(s => s.trim());

    if (expandList.includes("historicoOs")) {
      // Implementar depois com TBOS
      historicoOs = await EquipmentRepository.findOsByEquipamento(id, { limit: osLimit, offset: osOffset });
    }

    const existingEquipment = {
      idEquipamento: equipamento.PKEQUIPAMENTO,
      idCliente: equipamento.FKCLIENTE,
      nomeEquipamento: equipamento.EQUIPAMENTO,
      marca: equipamento.MARCA,
      modelo: equipamento.MODELO,
      numeroSerie: equipamento.NSERIE,
      localInstalacao: equipamento.LOCALEQUIPAMENTO,
      fabricante: equipamento.FABRICANTE,
      codigoInterno: equipamento.CODINTERNO,
      numeroPatrimonio: equipamento.NUMPATRIMONIO,
      descricao: equipamento.OBS,
      dataCadastro: equipamento.DATACAD,
      dataAtualizacao: equipamento.DATAATU,
    }

    return { ...existingEquipment, historicoOs };
  },

  async listByCliente(idCliente) {
    if (!idCliente) throw new Error("idCliente é obrigatório");

    const equipamentos = await EquipmentRepository.findByCliente(idCliente);
    return equipamentos.map(equip => ({
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
  },

  async update(id, equipmentData) {
    const existingEquipment = await EquipmentRepository.findById(id);
    if (!existingEquipment) throw new Error("Equipamento não encontrado");

    const updatedEquipment = {
      idCliente: equipmentData.idCliente ?? existingEquipment.FKCLIENTE,
      nomeEquipamento: equipmentData.nomeEquipamento ?? existingEquipment.EQUIPAMENTO,
      marca: equipmentData.marca ?? existingEquipment.MARCA,
      modelo: equipmentData.modelo ?? existingEquipment.MODELO,
      numeroSerie: equipmentData.numeroSerie ?? existingEquipment.NSERIE,
      localInstalacao: equipmentData.localInstalacao ?? existingEquipment.LOCALEQUIPAMENTO,
      fabricante: equipmentData.fabricante ?? existingEquipment.FABRICANTE,
      codigoInterno: equipmentData.codigoInterno ?? existingEquipment.CODINTERNO,
      numeroPatrimonio: equipmentData.numeroPatrimonio ?? existingEquipment.NUMPATRIMONIO,
      descricao: equipmentData.descricao ?? existingEquipment.OBS,
      now: new Date()
    }

    await EquipmentRepository.update(id, updatedEquipment);

    const updated = await this.find(id);
    return updated;
  },

  async delete(id) {
    const existing = await EquipmentRepository.findById(id);
    if (!existing) throw new Error("Equipamento não encontrado");

    const ok = await EquipmentRepository.delete(id);
    if (!ok) throw new Error("Erro ao remover equipamento");

    // Retorno conforme o schema de exclusão
    return {
      message: "Equipamento removido com sucesso",
      idEquipamento: Number(id),
      deletedAt: null // exclusão física
    };
  }
};
