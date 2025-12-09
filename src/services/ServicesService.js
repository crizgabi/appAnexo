import { ServicesRepository } from "../repositories/ServicesRepository.js";
import Service from "../models/ServiceModel.js";

export const ServicesService = {
    getServicesByDescription: async (description, dbEnvKey, dbType) => {
        try {
            const services = await ServicesRepository.getServicesByDescription(
                description, 
                dbEnvKey, 
                dbType
            );

            if (!services) {
                return [];
            }

            return services.map((c) => {
                return {
                    pkcodser: c.PKCODSER,
                    descricao: c.DESCRICAO,
                    nome: c.NOMESERVICO,
                    referencia: c.REFERENCIA,
                    valor: c.VALOR,
                };
            });
        } catch (error) {
            console.error("Error listing services:", error);
            throw error;
        }
    },

    getServicesByReference: async (reference, dbEnvKey, dbType) => {
        try {
            const services = await ServicesRepository.getServicesByReference(
                reference, 
                dbEnvKey, 
                dbType
            );

            if (!services) {
                return [];
            }

            return services.map((c) => {
                return {
                    pkcodser: c.PKCODSER,
                    descricao: c.DESCRICAO,
                    nome: c.NOMESERVICO,
                    referencia: c.REFERENCIA,
                    valor: c.VALOR,
                };
            });
        } catch (error) {
            console.error("Error listing services:", error);
            throw error;
        }
    },

    getServicesByName: async (name, dbEnvKey, dbType) => {
        try {
            const services = await ServicesRepository.getServicesByName(
                name, 
                dbEnvKey, 
                dbType
            );

            if (!services) {
                return [];
            }

            return services.map((c) => {
                return {
                    pkcodser: c.PKCODSER,
                    descricao: c.DESCRICAO,
                    nome: c.NOMESERVICO,
                    referencia: c.REFERENCIA,
                    valor: c.VALOR,
                };
            });
        } catch (error) {
            console.error("Error listing services:", error);
            throw error;
        }
    },

    getServicesByPrimaryKey: async (serviceId, dbEnvKey, dbType) => {
        try {
            const services = await ServicesRepository.getServicesByPrimaryKey(
                serviceId, 
                dbEnvKey, 
                dbType
            );

            if (!services) {
                return [];
            }

            return services.map((c) => {
                return {
                    pkcodser: c.PKCODSER,
                    descricao: c.DESCRICAO,
                    nome: c.NOMESERVICO,
                    referencia: c.REFERENCIA,
                    valor: c.VALOR,
                };
            });
        } catch (error) {
            console.error("Error listing services:", error);
            throw error;
        }
    },

    getServiceDetails: async (serviceId, dbEnvKey, dbType) => {
        try {
            const service = await ServicesRepository.getServiceDetails(
                serviceId, 
                dbEnvKey, 
                dbType);

            if (!service) {
                return null;
            }

            return {
                pkcodser: service.PKCODSER,
                descricao: service.DESCRICAO,
                nome: service.NOMESERVICO,
                referencia: service.REFERENCIA,
                valor: service.VALOR,
            };
        } catch (error) {
            console.error("Error listing service:", error);
            throw error;
        }
    },

    getAllServices: async (dbEnvKey, dbType) => {
        try {
            const services = await ServicesRepository.getAllServices(
                dbEnvKey, 
                dbType
            );

            if (!services) {
                return [];
            }

            return services.map((c) => {
                return {
                    pkcodser: c.PKCODSER,
                    descricao: c.DESCRICAO,
                    nome: c.NOMESERVICO,
                    referencia: c.REFERENCIA,
                    valor: c.VALOR,
                };
            });
        } catch (error) {
            console.error("Error listing services:", error);
            throw error;
        }
    },
}