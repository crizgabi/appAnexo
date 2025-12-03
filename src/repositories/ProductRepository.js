import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ProductRepository = {
    getProductByBarcode: async (barcode, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getProductByBarcode(barcode, dbEnvKey);
    },

    getProductByName: async (name, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getProductByName(name, dbEnvKey);
    },

    getProductByReference: async (reference, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getProductByReference(reference, dbEnvKey);
    },

    getProductByPrimaryKey: async (productId, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getProductByPrimaryKey(productId, dbEnvKey);
    },

    getProductDetails: async (productId, dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getProductDetails(productId, dbEnvKey);
    },

    getAllProducts: async (dbEnvKey, dbType) => {
        const client = DBClientFactory.getClient({
            dbType,
            module: "product"
        });

        return client.getAllProducts(dbEnvKey);
    },
};