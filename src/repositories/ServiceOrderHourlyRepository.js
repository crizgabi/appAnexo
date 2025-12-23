import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const ServiceOrderHourlyRepository = {

  findByServiceOrder: async (idConserto, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceOrderHourly"
    });

    return client.findByServiceOrder(idConserto, dbEnvKey);
  },

  create: async (hourly, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceOrderHourly"
    });

    return client.create(hourly, dbEnvKey);
  },

  delete: async (idHorario, idConserto, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "ServiceOrderHourly"
    });

    return client.delete(idHorario, idConserto, dbEnvKey);
  }
};
