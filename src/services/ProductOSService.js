import ProductOSModel from "../models/ProductOSModel.js";
import { ProductOSRepository } from "../repositories/ProductOSRepository.js";

export const ProductOSService = {
    create: async (data, dbEnvKey, dbType) => {
        const idOS = data.idConserto; 

        if (!idOS) throw new Error("Parâmetro obrigatório faltando: idConserto");
        if (!data.idProduto) throw new Error("Campo obrigatório faltando: idProduto");

        const quantidade = data.quantidade ?? 1;
        const valorUnitario = data.valorUnitario ?? 0;
        const descontoPercentual = data.descontoPercentual ?? 0;

        const valorTotal = quantidade * valorUnitario;

        const item = new ProductOSModel({
            idConserto: data.idConserto,
            idProduto: data.idProduto,
            observacao: data.observacao ?? null,
            descricaoProduto: data.descricaoProduto ?? null,
            quantidade,
            valorUnitario,
            descontoPercentual,
            valorTotal,
            unidade: data.unidade ?? null,
            idUsuario: data.idUsuario ?? null,
            idTecnico: data.idTecnico ?? null 
        });

        return ProductOSRepository.create(item, dbEnvKey, dbType);
    },

    getAllByOS: async (idOS, dbEnvKey, dbType) => {
        return ProductOSRepository.getAllByOS(idOS, dbEnvKey, dbType);
    },

    delete: async (idItem, dbEnvKey, dbType) => {
        return ProductOSRepository.delete(idItem, dbEnvKey, dbType);
    }
};
