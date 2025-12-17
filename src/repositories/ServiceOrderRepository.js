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

    deleteImage: async (idConserto, { caminho, legenda = null, idTecnico, fkCodUsu = null, nomeArquivo = null }, dbEnvKey) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.deleteImage(idConserto, { caminho, legenda, idTecnico, fkCodUsu, nomeArquivo }, dbEnvKey);
    },

    delete: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.delete(id, dbEnvKey);
    }
};
