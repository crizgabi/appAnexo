import { TecnicoRepository } from "../repositories/TechnicalRepository.js";

export const TecnicoService = {
  async list() {
    return await TecnicoRepository.findAll();
  },

  // async getById(id) {
  //   const tecnico = await TecnicoRepository.findById(id);

  //   if (!tecnico) {
  //     throw new Error("Técnico não encontrado");
  //   }

  //   return tecnico.map(row => ({
  //       idTecnico: row.IDTECNICO,
  //       nome: row.NOME,
  //       telefone: row.TELEFONE
  //   }));;
  // }
};
