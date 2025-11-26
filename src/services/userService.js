import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import { refreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import { randomBytes } from "crypto";
import { User } from "../models/UserModel.js"
import { format } from "date-fns";

export const UserService = {

  // LOGIN
  async loginUser({ login, password, dbEnvKey, dbType }) {
    const user = await UserRepository.findByLogin(login, dbEnvKey, dbType);
    if (!user) return null;

    if (user.SENHA !== password) return null;

    const token = generateToken({ login: user.LOGIN });

    const existingToken = await refreshTokenRepository.findRefreshTokenByLogin(user.LOGIN);
    if (existingToken) {
      await refreshTokenRepository.deleteRefreshToken(existingToken.token);
    }

    const refreshValue = generateRefreshTokenValue();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await refreshTokenRepository.saveRefreshToken(user.LOGIN, refreshValue, expires);

    return {
      user: { login: user.LOGIN },
      token,
      refreshToken: refreshValue
    };
  },

  // UPDATE PASSWORD
  async updatePassword(login, currentPassword, newPassword, dbEnvKey, dbType) {
    const user = await UserRepository.findByLogin(login, dbEnvKey, dbType);
    if (!user) return null;

    if (user.SENHA !== currentPassword) return null;

    await UserRepository.updatePassword(login, newPassword, dbEnvKey, dbType);

    return { login: user.LOGIN };
  },

  // REFRESH TOKEN
  async refreshToken(refreshToken) {
    const existing = await refreshTokenRepository.findRefreshToken(refreshToken);
    if (!existing) return null;

    this.validateRefreshToken(refreshToken)

    const newToken = generateToken({ login: existing.login });
    const newRefreshValue = generateRefreshTokenValue();
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await refreshTokenRepository.deleteRefreshToken(refreshToken);
    await refreshTokenRepository.saveRefreshToken(existing.login, newRefreshValue, newExpiresAt);

    return {
      user: { login: existing.login },
      token: newToken,
      refreshToken: newRefreshValue
    };
  },

  // validateRefreshToken
  async validateRefreshToken(refreshToken) {
    const row = await refreshTokenRepository.findRefreshToken(refreshToken);
    if (!row) return null;

    if (new Date(row.expiresAt) <= new Date()) {
      await refreshTokenRepository.deleteRefreshToken(refreshToken);
      return null;
    }

    return row;
  },

  // USER DETAILS
  async showUserDetails(login, dbEnvKey, dbType) {
    try {
      const user = await UserRepository.findByLogin(login, dbEnvKey, dbType);
      if (!user) return null;

      const details = await UserRepository.getUserInfo(login, dbEnvKey, dbType);
      if (!details) return null;

      const dataNascimento = details.DATANASC
        ? format(new Date(details.DATANASC), "dd/MM/yyyy")
        : null;

      return new User({
        id: details.PKTECNICO,
        login: details.LOGIN,
        passwordHash: details.SENHA,
        tecnico: {
          id: details.PKTECNICO,
          nome: details.NMTECNICO,
          cpf: details.CPF,
          rg: details.RG,
          email: details.EMAIL,
          celular: details.CELULAR,
          telefone1: details.FONE1,
          telefone2: details.FONE2,
          endereco: {
            logradouro: details.ENDERECO,
            numero: details.NUM,
            cep: details.CEP,
          },
          dataNascimento: dataNascimento,
        },
      });

    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
      throw error;
    }
  },
};

// Helpers
function generateToken({ login }) {
  return jwt.sign({ login }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function generateRefreshTokenValue() {
  return randomBytes(40).toString("hex");
}