import { ServicesService } from "../services/ServicesService.js";
import prisma from "../db/prismaClient.js";

export const getServices = async (req, res) => {
  const { description, reference, name, serviceId } = req.query;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    let services = [];
    
    try {

      if (!description && !reference && !name && !serviceId) {
        services = await ServicesService.getAllServices(
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (description) {
        services = await ServicesService.getServicesByDescription(
          description,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (reference) {
        services = await ServicesService.getServicesByReference(
          reference,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (name) {
        services = await ServicesService.getServicesByName(
          name,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (serviceId) {
        services = await ServicesService.getServicesByPrimaryKey(
          serviceId,
          tenant.dbEnvKey,
          tenant.dbType
        );
      }

      if (!services || services.length === 0) {
        return res.status(404).json({ message: "Nenhum serviço encontrado." });
      }

      return res.json(services);

    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return res.status(500).json({ error: "Erro interno ao buscar serviços." });
    }

  } catch (error) {
    console.error("Erro no getServices:", error);
    return res.status(500).json({ error: "Erro interno ao listar serviços" });
  }
};

export const getServiceDetails = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    try {
      const service = await ServicesService.getServiceDetails(serviceId, tenant.dbEnvKey, tenant.dbType);
      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }
      res.json(service);
    } catch (error) {
      console.error("Erro buscando detalhes do serviço:", error);
      res.status(500).json({ error: "Erro buscando detalhes do serviço." });
    }
  } catch (error) {
    console.error("Erro no getServices:", error);
    return res.status(500).json({ error: "Erro interno ao listar serviços" });
  }
};