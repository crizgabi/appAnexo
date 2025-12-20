import { ProductOSService } from "../services/ProductOSService.js";
import prisma from "../db/prismaClient.js";

export const ProductOSController = {

  // CRIAR ITEM NA OS
  create: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      // idConserto vem da URL
      const idConserto = req.params.id;
      if (!idConserto)
        return res.status(400).json({ error: "Parâmetro obrigatório faltando: idConserto" });

      const idConsertoNumerico = Number(idConserto);

      if (isNaN(idConsertoNumerico)) {
        return res.status(400).json({ error: "ID da Ordem de Serviço inválido. Esperado um número." });
      }

      const novoItem = await ProductOSService.create(
        {
          idConserto: idConsertoNumerico,
          idProduto: req.body.idProduto,
          quantidade: req.body.quantidade,
          valorUnitario: req.body.valorUnitario,
          descontoPercentual: req.body.descontoPercentual,
          observacao: req.body.observacao,
          unidade: req.body.unidade,
          idTecnico: req.body.idTecnico ?? null,
          idUsuario: req.user?.idUsuario ?? null
        },
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(201).json({
        ...novoItem,
        message: "Produto adicionado com sucesso à Ordem de Serviço."
      });

    } catch (err) {
      console.error("Erro ao adicionar item na OS:", err);
      return res.status(400).json({ error: err.message });
    }
  },

  // LISTAR ITENS DE UMA OS
  getAllByOS: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      const idConserto = req.params.id;
      const items = await ProductOSService.getAllByOS(
        idConserto,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.status(200).json(items);

    } catch (err) {
      console.error("Erro ao listar itens da OS:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  // REMOVER ITEM DA OS
  delete: async (req, res) => {
    try {
      const tenantId = req.headers["x-tenant-id"];
      if (!tenantId)
        return res.status(400).json({ error: "x-tenant-id header obrigatório" });

      const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
      if (!tenant)
        return res.status(404).json({ error: "Tenant inválido" });

      await ProductOSService.delete(
        req.params.idItem,
        tenant.dbEnvKey,
        tenant.dbType
      );

      return res.json({ message: "Item removido com sucesso" });

    } catch (err) {
      console.error("Erro ao remover item da OS:", err);
      return res.status(400).json({ error: err.message });
    }
  }
};
