import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const CustomerRepository = {

  // LISTA CLIENTES POR NOME
  async getCustomersByName(razaoSocial, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getCustomersByName(razaoSocial, dbEnvKey);
  },

  // LISTA TODOS OS CLIENTES (SEM FILTRO)
  async getAllCustomers(dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getAllCustomers(dbEnvKey);
  },

  // BUSCA POR PRIMARY KEY
  async getCustomerByPrimaryKey(primaryKey, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getCustomerByPrimaryKey(primaryKey, dbEnvKey);
  },

  // CRIAR CLIENTE
  async createCustomer(customerData, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ 
      dbType, 
      module: "customer" 
    });

    return client.createCustomer(customerData, dbEnvKey);
  },

  // UPDATE CLIENTE
  async updateCustomer(pkcodcli, customerData, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.updateCustomer(pkcodcli, customerData, dbEnvKey);
  }
};
