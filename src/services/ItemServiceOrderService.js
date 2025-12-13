import ItemServiceOrderModel from "../models/ItemServiceOrderModel.js";
import { ItemServiceOrderRepository } from "../repositories/ItemServiceOrderRepository.js";

export const ItemServiceOrderService = {
    create: async (data, dbEnvKey, dbType) => {
        const idOS = data.idConserto; // pegar da URL

        if (!idOS) throw new Error("Parâmetro obrigatório faltando: idConserto");
        if (!data.idProduto) throw new Error("Campo obrigatório faltando: idProduto");

        const quantidade = data.quantidade ?? 1;
        const valorUnitario = data.valorUnitario ?? 0;
        const descontoPercentual = data.descontoPercentual ?? 0;

        const valorTotal = quantidade * valorUnitario * (1 - descontoPercentual / 100);

        const item = new ItemServiceOrderModel({
            idConserto: data.idConserto,
            idProduto: data.idProduto,
            observacao: data.observacao ?? null,
            descricaoProduto: data.descricaoProduto ?? null,
            quantidade,
            valorUnitario,
            descontoPercentual,
            valorTotal,
            unidade: data.unidade ?? null
        });

        return ItemServiceOrderRepository.create(item, dbEnvKey, dbType);
    },

    getAllByOS: async (idOS, dbEnvKey, dbType) => {
        return ItemServiceOrderRepository.getAllByOS(idOS, dbEnvKey, dbType);
    },

    delete: async (idItem, dbEnvKey, dbType) => {
        return ItemServiceOrderRepository.delete(idItem, dbEnvKey, dbType);
    }
};
