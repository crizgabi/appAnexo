import { ServicesRepository } from "../repositories/ServicesRepository.js";
import Service from "../models/ServiceModel.js";

export const ServicesService = {
    getServiceByDescription: async (description) => {
        try {
            const services = await ServicesRepository.getServiceByDescription(description);

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

    getServiceByReference: async (reference) => {
        try {
            const services = await ServicesRepository.getServiceByReference(reference);

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

    getServiceByName: async (name) => {
        try {
            const services = await ServicesRepository.getServiceByName(name);

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

    getServiceByPrimaryKey: async (serviceId) => {
        try {
            const services = await ServicesRepository.getServiceByPrimaryKey(serviceId);

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

    getServiceDetails: async (serviceId) => {
        try {
            const service = await ServicesRepository.getServiceDetails(serviceId);

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
}