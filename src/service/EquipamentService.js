import Equipament from "../models/EquipamentModel.js";
import { EquipamentRepository } from "../repository/EquipamentRepository.js";

export const EquipamentService = {
  async create(data) {
    // Validação básica dos campos obrigatórios
    if (!data.idCliente || !data.nomeEquipamento || !data.marca || !data.modelo || !data.numeroSerie) {
      throw new Error("Campos obrigatórios faltando: idCliente, nomeEquipamento, marca, modelo, numeroSerie");
    }

    const equip = new Equipament(data);
    const result = await EquipamentRepository.create(equip);

    // Retorno conforme o schema esperado (sem imagens por enquanto)
    return {
      idEquipamento: result.idEquipamento,
      idCliente: equip.idCliente,
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
    // Listar todos os equipamentos (sem paginação)
    const equipamentos = await EquipamentRepository.findAll();

    // Retornar lista simples (não paginada)
    return equipamentos.map(equip => ({
      idEquipamento: equip.idEquipamento,
      idCliente: equip.idCliente,
      nomeEquipamento: equip.nomeEquipamento,
      marca: equip.marca,
      modelo: equip.modelo,
      numeroSerie: equip.numeroSerie,
      localInstalacao: equip.localInstalacao,
      fabricante: equip.fabricante,
      codigoInterno: equip.codigoInterno,
      numeroPatrimonio: equip.numeroPatrimonio,
      descricao: equip.descricao,
      dataCadastro: equip.dataCadastro,
      dataAtualizacao: equip.dataAtualizacao
    }));
  },

  async find(id, { expand = [], osLimit = 10, osOffset = 0 } = {}) {
    const equipamento = await EquipamentRepository.findById(id);
    if (!equipamento) throw new Error("Equipamento não encontrado");

    // Expand opcional (ex: historicoOs)
    let historicoOs = null;
    const expandList = Array.isArray(expand)
      ? expand
      : String(expand).split(",").map(s => s.trim());

    if (expandList.includes("historicoOs")) {
      // Implementar depois com TBOS
      historicoOs = await EquipamentRepository.findOsByEquipamento(id, { limit: osLimit, offset: osOffset });
    }

    return { ...equipamento, historicoOs };
  },

  async listByCliente(idCliente) {
    if (!idCliente) throw new Error("idCliente é obrigatório");

    const equipamentos = await EquipamentRepository.findByCliente(idCliente);
    return equipamentos.map(equip => ({
      idEquipamento: equip.idEquipamento,
      idCliente: equip.idCliente,
      nomeEquipamento: equip.nomeEquipamento,
      marca: equip.marca,
      modelo: equip.modelo,
      numeroSerie: equip.numeroSerie,
      localInstalacao: equip.localInstalacao,
      fabricante: equip.fabricante,
      codigoInterno: equip.codigoInterno,
      numeroPatrimonio: equip.numeroPatrimonio,
      descricao: equip.descricao,
      dataCadastro: equip.dataCadastro,
      dataAtualizacao: equip.dataAtualizacao
    }));
  },

  async update(id, data) {
    const existing = await EquipamentRepository.findById(id);
    if (!existing) throw new Error("Equipamento não encontrado");

    // Merge parcial: mantém os dados antigos e sobrescreve os novos
    const merged = { ...existing, ...data };

    await EquipamentRepository.update(id, merged);

    // Retorna equipamento atualizado
    const updated = await EquipamentRepository.findById(id);
    return updated;
  },

  async delete(id) {
    const existing = await EquipamentRepository.findById(id);
    if (!existing) throw new Error("Equipamento não encontrado");

    const ok = await EquipamentRepository.delete(id);
    if (!ok) throw new Error("Erro ao remover equipamento");

    // Retorno conforme o schema de exclusão
    return {
      message: "Equipamento removido com sucesso",
      idEquipamento: Number(id),
      deletedAt: null // exclusão física
    };
  }
};
