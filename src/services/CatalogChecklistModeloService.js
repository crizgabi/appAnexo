import { ChecklistModeloRepository } from "../repositories/ChecklistModeloRepository.js";

export const CatalogChecklistModeloService = {
    getAllChecklists: async (dbEnvKey, dbType) => {
        try {
            const checklists = await ChecklistModeloRepository.listChecklists(
                dbEnvKey,
                dbType
            );

            if (!checklists) {
                return [];
            }

            const checklistWithItems = await Promise.all(
                checklists.map(async (checklist) => {
                    const itens = await ChecklistModeloRepository.listChecklistItens(
                        dbEnvKey,
                        dbType,
                        checklist.PKCHECKLIST
                    );

                    const parsedItens = (itens || []).map((item) => {
                        return {
                            idItem: item.PKCHECKLISTITEM,
                            ordem: item.ORDEM,
                            pergunta: item.DESCRICAOITEM,
                            tipoResposta: item.TIPO,
                        };
                    });

                    return {
                        idChecklist: checklist.PKCHECKLIST,
                        nomeChecklist: checklist.DESCRICAO,
                        ativo: checklist.ATIVO,
                        itens: parsedItens,
                    };
                })
            );

            return checklistWithItems;
        } catch (error) {
            console.error("Error listing catalog checklist models:", error);
            throw error;
        }
    },
};
