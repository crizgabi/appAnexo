import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ChecklistModeloRepository = {
    listChecklists: async (dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "checklistModelo"
        });

        return client.listChecklists(dbEnvKey);
    },

    listChecklistItens: async (dbEnvKey, dbType, idChecklist) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "checklistModelo"
        });

        return client.listChecklistItens(dbEnvKey, idChecklist);
    },
};
