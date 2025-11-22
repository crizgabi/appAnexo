import { DBClientFactory } from "../middlewares/DBClientFactory.js";

export const CityRepository = {
  findByNameAndUf(nomeCidade, uf, dbEnvKey, dbType) {
    const client = DBClientFactory.getClient({ dbType, module: "city" });
    return client.findByNameAndUf(nomeCidade, uf, dbEnvKey);
  }
};