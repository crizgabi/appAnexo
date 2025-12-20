import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ServiceOrderRepository = {
    create: async (os, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.create(os, dbEnvKey);
    },

    getAll: async (dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getAll(dbEnvKey);
    },

    getById: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getById(id, dbEnvKey);
    },

    getByUser: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getByUser(id, dbEnvKey);
    },

    update: async (id, data, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.update(id, data, dbEnvKey);
    },

    addSignature: async (id, { assinatura1, assinatura2 }, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.addSignature(id, { assinatura1, assinatura2 }, dbEnvKey);
    },

    getSignature: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getSignature(id, dbEnvKey);
    },

    deleteSignature: async (id, tipo, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.deleteSignature(id, tipo, dbEnvKey);
    },

    addImage: async (idConserto, idTecnico, fkCodUsu, caminho, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.addImage(idConserto, idTecnico, fkCodUsu, caminho, dbEnvKey);
    },

    getImages: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getImages(id, dbEnvKey);
    },

    getImageById: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.getImageById(id, dbEnvKey);
    },

    deleteImage: async (idConserto, imageId, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.deleteImage(idConserto, imageId, dbEnvKey);
    },

    updateImageDescription: async (idImagem, descricao, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.updateImageDescription(idImagem, descricao, dbEnvKey);
    },

    delete: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.delete(id, dbEnvKey);
    },

    getCheckinState: async (idConserto, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.getCheckinState(idConserto, dbEnvKey);
    },

    setCheckIn: async (idConserto, dataAtendimento, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.setCheckIn(idConserto, dataAtendimento, dbEnvKey);
    },

    setCheckOut: async (idConserto, dataChecklistFinal, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.setCheckOut(idConserto, dataChecklistFinal, dbEnvKey);
    },

    addChecklistResposta: async (
        idConserto,
        { idChecklist, respostas },
        dbEnvKey,
        dbType
    ) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.addChecklistResposta(
            idConserto,
            { idChecklist, respostas },
            dbEnvKey
        );
    },

    getChecklistById: async (idChecklist, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.getChecklistById(idChecklist, dbEnvKey);
    },

    getChecklistItens: async (idChecklist, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.getChecklistItens(idChecklist, dbEnvKey);
    },

    getChecklistsRespondidos: async (idConserto, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.getChecklistsRespondidos(idConserto, dbEnvKey);
    },

    deleteChecklistResposta: async (idConserto, idChecklist, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.deleteChecklistResposta(idConserto, idChecklist, dbEnvKey);
    },

    getChecklistDetail: async (idConserto, idChecklist, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });

        return client.getChecklistDetail(idConserto, idChecklist, dbEnvKey);
    },

};
