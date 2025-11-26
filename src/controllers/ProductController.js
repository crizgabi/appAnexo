import { ProductService } from "../services/ProductService.js";
import prisma from "../db/prismaClient.js";

export const getProducts = async (req, res) => {
  const { barcode, name, reference, productId } = req.query;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    try {
      let products = [];

      if (barcode) {
        products = await ProductService.getProductByBarcode(
          barcode,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (name) {
        products = await ProductService.getProductByName(
          name,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (reference) {
        products = await ProductService.getProductByReference(
          reference,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else if (productId) {
        products = await ProductService.getProductByPrimaryKey(
          productId,
          tenant.dbEnvKey,
          tenant.dbType
        );
      } else {
        return res.status(400).json({
          error: "Informe 'barcode', 'name', 'reference' ou 'productId' na query.",
        });
      }

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Nenhum produto encontrado." });
      }

      return res.json(products);

    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).json({ error: "Erro interno ao buscar produtos." });
    }
  } catch (error) {
    console.error("Erro no getProducts:", error);
    return res.status(500).json({ error: "Erro interno ao listar produtos" });
  }
};

export const getProductDetails = async (req, res) => {
  const { productId } = req.params;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    try {
      const product = await ProductService.getProductDetails(
        productId,
        tenant.dbEnvKey,
        tenant.dbType
      );

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }

      return res.json(product);

    } catch (error) {
      console.error("Erro buscando detalhes do produto:", error);
      res.status(500).json({ error: "Erro buscando detalhes do produto." });
    }
  } catch (error) {
    console.error("Erro no getProducts:", error);
    return res.status(500).json({ error: "Erro interno ao listar produtos" });
  }
};