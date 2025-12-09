import { DBClientFactory }  from "../middlewares/DBClientFactory.js";

export const TechnicalRepository = {

  async findAll( dbEnvKey, dbType ) {
    const client = DBClientFactory.getClient({
      dbType,
      module: "technical",
    });

    return await client.findAll(dbEnvKey);
  },


};
