import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ProductOSRepository = {
    create: async (item, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "ProductServiceOrder"
        });
        return client.create(item, dbEnvKey);
    },

    getAllByOS: async (idOS, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "ProductServiceOrder"
        });
        return client.getAllByOS(idOS, dbEnvKey);
    },

    delete: async (idItem, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "ProductServiceOrder"
        });
        return client.delete(idItem, dbEnvKey);
    }
};
