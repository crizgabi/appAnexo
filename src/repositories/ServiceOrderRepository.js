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

    delete: async (id, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "serviceOrder"
        });
        return client.delete(id, dbEnvKey);
    }
};
