import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { UserRepository } from "../repository/userRepository.js";

// export const listUsers = async () => {
//   return await prisma.user.findMany({
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       createdAt: true,
//     },
//   });
// };

export const UserService = {
  loginUser: async (login, password) => {
    const user = await UserRepository.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = user.SENHA === password; 

    if (!isPasswordValid) return null;

    const token = generateToken({ login: user.LOGIN });
    return { user: { login: user.LOGIN }, token };
  },

  updatePassword: async (login, currentPassword, newPassword) => {
    const user = await UserRepository.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = user.SENHA === currentPassword;
    if (!isPasswordValid) return null;

    await UserRepository.updatePassword(login, newPassword);
    return { login: user.LOGIN };
  },
};

export const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = { login: user.login };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};