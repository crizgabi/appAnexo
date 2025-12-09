import Technical from "../models/TechnicalModel.js";
import { TechnicalRepository } from "../repositories/TechnicalRepository.js";

export const TechnicalService = {
  
  async list( dbEnvKey, dbType ) {
    const rows = await TechnicalRepository.findAll( dbEnvKey, dbType );

    return rows.map((t) => ({
      id: t.IDTECNICO,
      nome: t.NOME,
      ativo: t.ATIVO
    }));
  },
};
