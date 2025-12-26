import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const UserRepository = {
  findByLogin(login, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.findUserByLogin(login, dbEnvKey);
  },

  getUserInfo(login, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.getUserInfo(login, dbEnvKey);
  },

  getThecnicianByOsPrimaryKey(idConserto, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.getThecnicianByOsPrimaryKey(idConserto, dbEnvKey);
  },

  updatePassword(login, newPassword, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.updatePassword(login, newPassword, dbEnvKey);
  },

  getAllUsers(dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.getAllUsers(dbEnvKey);
  },
};