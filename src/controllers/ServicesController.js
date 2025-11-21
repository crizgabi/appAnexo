import { ServicesService } from "../services/ServicesService.js";

export const getServices = async (req, res) => {
  const { description, reference, name, serviceId } = req.query;

  try {
    let services = [];

    if (description) {
      services = await ServicesService.getServiceByDescription(description);
    } else if (reference) {
      services = await ServicesService.getServiceByReference(reference);
    } else if (name) {
      services = await ServicesService.getServiceByName(name);
    } else if (serviceId) {
      services = await ServicesService.getServiceByPrimaryKey(serviceId);
    } else {
      return res.status(400).json({ error: "Informe 'descricao', 'referencia', 'nome' ou 'id' na query." });
    }

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "Nenhum serviço encontrado." });
    }

    return res.json(services);

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
            return res.status(404).json({ message: "Serviço não encontrado." });
        }
        res.json(service);
    } catch (error) {
        console.error("Erro buscando detalhes do serviço:", error);
        res.status(500).json({ error: "Erro buscando detalhes do serviço." });
    }
};
