import { CustomerService } from "../services/CustomerService.js";
import prisma from "../../src/db/prismaClient.js";

export const getCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    const customer = await CustomerService.getCustomerByPrimaryKey(
      id,
      tenant.dbEnvKey,
      tenant.dbType
    );

    if (!customer)
      return res.status(404).json({ error: "Cliente não encontrado" });

    return res.json({
      message: "Cliente encontrado com sucesso",
      customer,
    });
  } catch (error) {
    console.error("Erro no getCustomer:", error);
    return res.status(500).json({ error: "Erro interno ao buscar cliente" });
  }
};

export const getCustomersByName = async (req, res) => {
  const { razaoSocial } = req.query;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    let customers = [];

    if (!razaoSocial || razaoSocial.trim() === "") {
      customers = await CustomerService.getAllCustomers(
        tenant.dbEnvKey,
        tenant.dbType
      );
    } else {
      customers = await CustomerService.getCustomersByName(
        razaoSocial,
        tenant.dbEnvKey,
        tenant.dbType
      );
    }

    return res.json({ customers });

  } catch (error) {
    console.error("Erro no getCustomersByName:", error);
    return res.status(500).json({ error: "Erro interno ao listar clientes" });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    const customers = await CustomerService.getAllCustomers(
      tenant.dbEnvKey,
      tenant.dbType
    );

    return res.json({ customers });

  } catch (error) {
    console.error("Erro no getAllCustomers:", error);
    return res.status(500).json({ error: "Erro interno ao listar clientes" });
  }
};


export const createCustomer = async (req, res) => {
  const customerData = req.body;
  const { login } = req.user;

  if (!login)
    return res.status(401).json({ error: "Usuário não autenticado" });

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    const result = await CustomerService.createCustomer(
      customerData,
      login,
      tenant.dbEnvKey,
      tenant.dbType
    );

    return res.status(201).json({
      message: "Cliente criado com sucesso",
      customer: result,
    });
  } catch (error) {
    console.error("Erro no createCustomer:", error);
    return res.status(500).json({ error: "Erro interno ao criar cliente" });
  }
};

export const updateCustomer = async (req, res) => {
  const customerData = req.body;
  const { id } = req.params;
  const { login } = req.user;

  if (!login)
    return res.status(401).json({ error: "Usuário não autenticado" });

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant)
      return res.status(404).json({ error: "Tenant inválido" });

    const result = await CustomerService.updateCustomer(
      id,
      customerData,
      login,
      tenant.dbEnvKey,
      tenant.dbType
    );

    return res.status(200).json({
      message: "Cliente atualizado com sucesso",
      customer: result,
    });
  } catch (error) {
    console.error("Erro no updateCustomer:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar cliente" });
  }
};