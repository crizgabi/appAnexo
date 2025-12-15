import { FireBirdUserClient } from "../repositories/FireBirdUserClient.js";
import { FireBirdCustomerClient } from "../repositories/FireBirdCustomerClient.js";
import { FireBirdCityClient } from "../repositories/FireBirdCityClient.js";
import { FireBirdServicesClient } from "../repositories/FireBirdServicesClient.js";
import { FireBirdProductClient } from "../repositories/FireBirdProductClient.js";
import { FireBirdEquipmentClient } from "../repositories/FireBirdEquipmentClient.js";
import { FireBirdTechnicalClient } from "../repositories/FireBirdTechnicalClient.js";
import { FireBirdServiceOrderClient } from "../repositories/FireBirdServiceOrderClient.js";
import { FireBirdItemServiceOrderClient } from "../repositories/FireBirdItemServiceOrderClient.js";
import { FireBirdServiceOSClient } from "../repositories/FireBirdServiceOSClient.js";

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
            return FireBirdCityClient;
          case "services":
            return FireBirdServicesClient;
          case "product":
            return FireBirdProductClient;
          case "equipment":
            return FireBirdEquipmentClient;
          case "technical":
            return FireBirdTechnicalClient;
          case "serviceOrder":
            return FireBirdServiceOrderClient;
          case "itemServiceOrder":
            return FireBirdItemServiceOrderClient;
          case "ServiceServiceOrder":
            return FireBirdServiceOSClient;
          default:
            throw new Error(`Unsupported module for Firebird: ${module}`);
        }

      default:
        throw new Error(`Unsupported DB type: ${dbType}`);
    }
  }

};