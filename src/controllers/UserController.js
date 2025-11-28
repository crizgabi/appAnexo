import { UserService } from "../services/UserService.js";
import prisma from "../db/prismaClient.js";

// POST /login
export const loginUser = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password)
    return res.status(400).json({ error: "Login e senha são obrigatórios" });

  try {
    const resolve = await resolveTenant(req);
    if (resolve.error) return res.status(resolve.status).json({ error: resolve.error });

    const { tenant } = resolve;

    const result = await UserService.loginUser({
      login,
      password,
      dbEnvKey: tenant.dbEnvKey,
      dbType: tenant.dbType
    });

    if (!result)
      return res.status(401).json({ error: "Invalid login or password" });

    return res.json({
      message: "Login successful",
      user: result.user,
      token: result.token,
      refreshToken: result.refreshToken,
      tenantId: tenant.id
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no login" });
  }
};

// POST /users/refresh
export const refreshSession = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { refreshToken } = req.body;

    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    if (!refreshToken)
      return res.status(400).json({ error: "Refresh token required" });
    
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

    const result = await UserService.refreshToken(
      refreshToken,
      tenant.dbEnvKey,
      tenant.dbType
    );

    if (!result)
      return res.status(401).json({ error: "Invalid or expired refresh token" });

    return res.json(result);
  } catch (error) {
    console.error("Erro no refreshSession:", error);
    return res.status(500).json({ error: "Erro ao renovar sessão" });
  }
};

// PUT /users/update-password
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { login } = req.user;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ error: "Current password and new password are required" });

  if (currentPassword === newPassword)
    return res.status(400).json({ error: "Current password and new password cannot be the same" });

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

    const result = await UserService.updatePassword(
      login,
      currentPassword,
      newPassword,
      tenant.dbEnvKey,
      tenant.dbType
    );

    if (!result)
      return res.status(401).json({ error: "Invalid email or current password" });

    return res.json({ message: "Password updated!", user: result });
  } catch (error) {
    console.error("Erro no updatePassword:", error);
    return res.status(500).json({ error: "Error updating password" });
  }
};

// GET /users/details
export const showUserDetails = async (req, res) => {
  const { login } = req.user;

  try {
    const tenantId = req.headers["x-tenant-id"];
    if (!tenantId)
      return res.status(400).json({ error: "x-tenant-id header obrigatório" });

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) return res.status(404).json({ error: "Tenant inválido" });

    const userDetails = await UserService.showUserDetails(
      login,
      tenant.dbEnvKey,
      tenant.dbType
    );

    if (!userDetails)
      return res.status(401).json({ error: "User not found or unauthorized" });

    return res.status(200).json({
      message: "Detalhes do usuário encontrados com sucesso.",
      user: userDetails
    });
  } catch (error) {
    console.error("Erro no controller showUserDetails:", error);
    return res.status(500).json({ error: "Error fetching user details" });
  }
};

// Helpers
async function resolveTenant(req) {
  const tenantHeader = req.headers["x-tenant-id"];
  const { empresaId } = req.body;

  let tenant;

  if (tenantHeader) {
    tenant = await prisma.tenant.findUnique({ where: { id: tenantHeader } });
    if (!tenant) return { error: "Tenant inválido", status: 404 };
  } else {
    if (!empresaId)
      return { error: "empresaId obrigatório", status: 400 };

    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa)
      return { error: "Empresa não encontrada", status: 404 };

    tenant = await prisma.tenant.findUnique({ where: { id: empresa.tenantId } });
    if (!tenant)
      return { error: "Tenant não encontrado", status: 500 };
  }

  return { tenant };
}