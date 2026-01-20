import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const CustomerRepository = {

  async getCustomersByName(razaoSocial, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getCustomersByName(razaoSocial, dbEnvKey);
  },

  async getAllCustomers(dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getAllCustomers(dbEnvKey);
  },

  async getCustomerByPrimaryKey(primaryKey, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.getCustomerByPrimaryKey(primaryKey, dbEnvKey);
  },

  async createCustomer(customerData, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ 
      dbType, 
      module: "customer" 
    });

    return client.createCustomer(customerData, dbEnvKey);
  },

  async updateCustomer(pkcodcli, customerData, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "customer"
    });

    return client.updateCustomer(pkcodcli, customerData, dbEnvKey);
  }
};
