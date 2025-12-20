import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ServiceOSRepository  = {
  create: async (item, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceServiceOrder"
    });
    return client.create(item, dbEnvKey);
  },

  getAllByOS: async (idOS, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceServiceOrder"
    });
    return client.getAllByOS(idOS, dbEnvKey);
  },

  delete: async (idItem, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceServiceOrder"
    });
    return client.delete(idItem, dbEnvKey);
  }

};