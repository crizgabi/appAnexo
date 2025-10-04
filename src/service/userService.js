import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/userRepository.js";
import { refreshTokenRepository } from "../repository/refreshTokenRepository.js";
import { randomBytes } from "crypto";

export const UserService = {
  loginUser: async (login, password) => {
    const user = await UserRepository.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = user.SENHA === password; 

    if (!isPasswordValid) return null;

    const token = generateToken({ login: user.LOGIN });

    const existingToken = await refreshTokenRepository.findRefreshTokenByLogin(user.LOGIN);
    if (existingToken) {
      await refreshTokenRepository.deleteRefreshToken(existingToken.token);
    }

    const refreshTokenValue = generateRefreshTokenValue();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias

    await refreshTokenRepository.saveRefreshToken(user.LOGIN, refreshTokenValue, expiresAt);

return { 
      user: { login: user.LOGIN }, 
      token, 
      refreshToken: refreshTokenValue 
    };
},

  updatePassword: async (login, currentPassword, newPassword) => {
    const user = await UserRepository.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = user.SENHA === currentPassword;
    if (!isPasswordValid) return null;

    await UserRepository.updatePassword(login, newPassword);
    return { login: user.LOGIN };
  },

  refreshToken: async (refreshToken) => {
    const existing = await refreshTokenRepository.findRefreshToken(refreshToken);
    if (!existing) return null;

    if (new Date(existing.expiresAt) <= new Date()) {
      await refreshTokenRepository.deleteRefreshToken(refreshToken);
      return null;
    }

    const newToken = generateToken({ login: existing.login });
    const newRefreshToken = generateRefreshTokenValue();
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await refreshTokenRepository.deleteRefreshToken(refreshToken);
    await refreshTokenRepository.saveRefreshToken(existing.login, newRefreshToken, newExpiresAt);

    return {
      user: { login: existing.login },
      token: newToken,
      refreshToken: newRefreshToken
    };
  },
};

function generateToken(user) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = { login: user.login };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

function generateRefreshTokenValue() {
    return randomBytes(40).toString("hex");

}