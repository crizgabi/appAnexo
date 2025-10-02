import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

export const createUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { email: normalizedEmail, passwordHash },
  });
};

export const listUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  const token = generateToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

export const updatePassword = async (email, currentPassword, newPassword) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Busca usuário no banco
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) return null;

  // Verifica se a senha atual confere
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return null;

  // Gera o novo hash
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Atualiza a senha no banco
  const updatedUser = await prisma.user.update({
    where: { email: normalizedEmail },
    data: { passwordHash },
    select: { id: true, email: true },
  });

  return updatedUser;
};

export const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};