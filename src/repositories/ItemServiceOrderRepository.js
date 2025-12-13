import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ItemServiceOrderRepository = {
    create: async (item, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "itemServiceOrder"
        });
        return client.create(item, dbEnvKey);
    },

    getAllByOS: async (idOS, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "itemServiceOrder"
        });
        return client.getAllByOS(idOS, dbEnvKey);
    },

    delete: async (idItem, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "itemServiceOrder"
        });
        return client.delete(idItem, dbEnvKey);
    }
};
