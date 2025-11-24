import OrdemServico from "../models/OSModel.js";
import { OSRepository } from "../repositories/OSRepository.js";

export const OSService = {
  // ------------------ CREATE ------------------
  async create(data) {
    const os = new OrdemServico({
      ...data,
      idStatus: data.idStatus ?? 1, // padrão = aberto
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    });

    const id = await OSRepository.create(os);
    return await OSRepository.findById(id);
  },

  // ------------------ FIND ALL ------------------
  async findAll() {
    const rows = await OSRepository.findAll();

    return rows.map(row => ({
      idConserto: row.IDCONSERTO,
      numeroOS: row.NUMEROOS,
      idCliente: row.IDCLIENTE,
      nomeCliente: row.NOMECLIENTE,
      enderecoCliente: row.ENDERECOCLIENTE,
      idEquipamento: row.IDEQUIPAMENTO,
      nomeEquipamento: row.NOMEEQUIPAMENTO,
      defeitoReclamado: row.DEFEITORECLAMADO,
      idStatus: row.IDSTATUS,
      nomeStatus: row.NOMESTATUS,
      idTecnicoResponsavel: row.IDTECNICORESPONSAVEL,
      nomeTecnicoResponsavel: row.NOMETECNICORESPONSAVEL,
      dataCadastro: row.DATACAD ? new Date(row.DATACAD).toISOString() : null,
      dataAtualizacao: row.DATAATU ? new Date(row.DATAATU).toISOString() : null,
      dataConserto: row.DATACONSERTO ? new Date(row.DATACONSERTO).toISOString() : null,
      hora: row.HORA,
    }));
  },

  // ------------------ FIND BY ID ------------------
  async findById(id) {
    return await OSRepository.findById(id);
  },

  // ------------------ UPDATE ------------------
  async update(id, data) {
    const existing = await OSRepository.findById(id);
    if (!existing) throw new Error("Ordem de serviço não encontrada");

    const os = new OrdemServico({
      ...existing,
      ...data,
      idConserto: id,
      dataAtualizacao: new Date(),
    });

    await OSRepository.update(id, os);
    return await OSRepository.findById(id);
  },

  // ------------------ DELETE ------------------
  async delete(id) {
    return await OSRepository.delete(id);
  }
};
