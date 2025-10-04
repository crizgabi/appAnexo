import prisma from "../db/prisma.js";

export const refreshTokenRepository = {
  async saveRefreshToken(login, token, expiresAt) {
      return prisma.refreshToken.create({ data: { login, token, expiresAt } });
  },

  async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  },

  async findRefreshTokenByLogin(login) {
    return prisma.refreshToken.findFirst({
      where: { login }
    });
  },

  async deleteRefreshToken(token) {
    try {
      return await prisma.refreshToken.delete({
        where: { token },
      });
    } catch (err) {
      if (err?.code === "P2025") {
        return null; 
      }
      throw err; 
    }
  },

  async deleteRefreshTokenIfExists(token) {
    const result = await prisma.refreshToken.deleteMany({
      where: { token },
    });
    return result.count;
  }
};