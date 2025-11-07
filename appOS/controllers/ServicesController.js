import { ServicesService } from "../services/ServicesService.js";

export const getServices = async (req, res) => {
    const { description, reference, name, serviceId } = req.query;

    try {
        if (description) {
            const services = await ServicesService.getServiceByDescription(description);
            return res.json(services);
        }

        if (reference) {
            const services = await ServicesService.getServiceByReference(reference);
            return res.json(services);
        }

        if (name) {
            const services = await ServicesService.getServiceByName(name);
            return res.json(services);
        }

        if (serviceId) {
            const services = await ServicesService.getServiceByPrimaryKey(serviceId);
            return res.json(services);
        }

        return res.status(400).json({ error: "Informe 'description' ou 'reference' na query." });

    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        res.status(500).json({ error: "Erro interno ao buscar serviços." });
    }
};

export const getServiceDetails = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const service = await ServicesService.getServiceDetails(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Serviço não encontrado." });
        }
        res.json(service);
    } catch (error) {
        console.error("Erro buscando detalhes do serviço:", error);
        res.status(500).json({ error: "Erro buscando detalhes do serviço." });
    }
};
