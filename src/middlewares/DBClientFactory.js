import { FireBirdUserClient } from "../repositories/FireBirdUserClient.js";
import { FireBirdCustomerClient } from "../repositories/FireBirdCustomerClient.js";
import { FirebirdCityClient } from "../repositories/FirebirdCityClient.js";
import { FirebirdServicesClient } from "../repositories/FireBirdServicesClient.js";
import { FireBirdProductClient } from "../repositories/FireBirdProductClient.js";
import { FireBirdEquipmentClient } from "../repositories/FireBirdEquipmentClient.js";
import { FireBirdTechnicalClient } from "../repositories/FireBirdTechnicalClient.js";

export class DBClientFactory {
  static getClient({ dbType, module }) {
    switch (dbType) {
      case "firebird":
        switch (module) {
          case "user":
            return FireBirdUserClient;
          case "customer":
            return FireBirdCustomerClient;
          case "city":
            return FirebirdCityClient;
          case "services":
            return FirebirdServicesClient;
          case "product":
            return FireBirdProductClient;
          case "equipment":
            return FireBirdEquipmentClient;
          case "technical":
            return FireBirdTechnicalClient;
          default:
            throw new Error(`Unsupported module for Firebird: ${module}`);
        }

      default:
        throw new Error(`Unsupported DB type: ${dbType}`);
    }
  }
};