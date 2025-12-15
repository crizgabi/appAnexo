import ServiceOSModel from "../models/ServiceOSModel.js";
import { ServiceOSRepository } from "../repositories/ServiceOSRepository.js";

export const ServiceOSService  = {

  create: async (data, dbEnvKey, dbType) => {
    const idOS = data.idConserto;

    if (!idOS) throw new Error("Parâmetro obrigatório faltando: idConserto");
    if (!data.idServico) throw new Error("Campo obrigatório faltando: idServico");

    const quantidade = data.quantidade ?? 1;
    const valorUnitario = data.valorUnitario ?? 0;
    const valorTotal = quantidade * valorUnitario;

    const item = new ServiceOSModel({
      idConserto: data.idConserto,
      idServico: data.idServico,
      observacao: data.observacao ?? null,
      quantidade,
      valorUnitario,
      valorTotal,
      idUsuario: data.idUsuario ?? null,
      ordem: data.ordem ?? null
    });

    return ServiceOSRepository.create(item, dbEnvKey, dbType);
  },

  getAllByOS: async (idOS, dbEnvKey, dbType) => {
    return ServiceOSRepository.getAllByOS(
      idOS,
      dbEnvKey,
      dbType
    );
  },

  delete: async (idItem, dbEnvKey, dbType) => {
    return ServiceOSRepository.delete(
      idItem,
      dbEnvKey,
      dbType
    );
  }

};
