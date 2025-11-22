import { FirebirdUserClient } from "../repositories/FirebirdUserClient.js";
import { FireBirdCustomerClient } from "../repositories/FireBirdCustomerClient.js";
import { FirebirdCityClient } from "../repositories/FirebirdCityClient.js";
import { FirebirdServicesClient } from "../repositories/FireBirdServicesClient.js";
import { FireBirdProductClient } from "../repositories/FireBirdProductClient.js";
import { FireBirdEquipmentClient } from "../repositories/FireBirdEquipmentClient.js";

export class DBClientFactory {
  static getClient({ dbType, module }) {
    switch (dbType) {
      case "firebird":
        switch (module) {
          case "user":
            return FirebirdUserClient;
          case "customer":
            return FireBirdCustomerClient;
          case "city":
            return FirebirdCityClient;
          case "services":
            return FirebirdServicesClient;
          case "product":
            return FireBirdProductClient;
          case "equipment":
            return FireBirdEquipmentClient
          default:
            throw new Error(`Unsupported module for Firebird: ${module}`);
        }

      default:
        throw new Error(`Unsupported DB type: ${dbType}`);
    }
  }
};