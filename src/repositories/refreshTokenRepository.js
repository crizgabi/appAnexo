import redisClient from "../db/RedisClient.js";

const PREFIX = "refreshToken:";

export const refreshTokenRepository = {
  async saveRefreshToken(login, token, expiresAt) {
    const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    
    await redisClient.set(`${PREFIX}${token}`, login, { EX: ttl });
    
    await redisClient.set(`${PREFIX}login:${login}`, token, { EX: ttl });
  },

  async findRefreshToken(token) {
    const login = await redisClient.get(`${PREFIX}${token}`);
    if (!login) return null;

    const ttl = await redisClient.ttl(`${PREFIX}${token}`);
    const expiresAt = new Date(Date.now() + ttl * 1000);

    return { token, login, expiresAt };
  },

  async findRefreshTokenByLogin(login) {
    const token = await redisClient.get(`${PREFIX}login:${login}`);
    if (!token) return null;

    const ttl = await redisClient.ttl(`${PREFIX}${token}`);
    const expiresAt = new Date(Date.now() + ttl * 1000);

    return { token, login, expiresAt };
  },

  async deleteRefreshToken(token) {
    const login = await redisClient.get(`${PREFIX}${token}`);
    if (login) {
      await redisClient.del(`${PREFIX}login:${login}`);
    }
    await redisClient.del(`${PREFIX}${token}`);
  },
};