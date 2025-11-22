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

  updatePassword(login, newPassword, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "user" });
    return client.updatePassword(login, newPassword, dbEnvKey);
  }
};