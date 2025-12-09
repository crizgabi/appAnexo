import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ServicesRepository = {
    getServicesByDescription: async (description, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getServicesByDescription(description, dbEnvKey);
    },

    getServicesByReference: async (reference, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getServicesByReference(reference, dbEnvKey);
    },

    getServicesByName: async (name, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getServicesByName(name, dbEnvKey);
    },

    getServicesByPrimaryKey: async (serviceId, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getServicesByPrimaryKey(serviceId, dbEnvKey);
    },

    getServiceDetails: async (serviceId, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getServiceDetails(serviceId, dbEnvKey);
    },

    getAllServices: async (dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "services"
        });

        return client.getAllServices(dbEnvKey);
    },
};