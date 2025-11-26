import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const EquipmentRepository = {

  create: async (equip, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.create(equip, dbEnvKey);
  },

  findAll: async (dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.findAll(dbEnvKey);
  },

  findById: async (id, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.findById(id, dbEnvKey);
  },

  findByCustomer: async (idCliente, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.findByCliente(idCliente, dbEnvKey);
  },

  update: async (id, equipmentData, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.update(id, equipmentData, dbEnvKey);
  },

  delete: async (id, dbEnvKey, dbType) => {
    const client = DBClientFactory.getClient({
      dbType,
      module: "equipment"
    });

    return client.delete(id, dbEnvKey);
  }
};
