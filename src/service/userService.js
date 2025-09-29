import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, users, Roles } from "../models/userModel.js";

export const createUser = async (email, password, role = Roles.USER) => {
  if (!Object.values(Roles).includes(role)) {
    throw new Error("Role not allowed");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = users.find(u => u.email === normalizedEmail);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const id = users.length + 1;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User(id, normalizedEmail, passwordHash, role);
  users.push(user);
  return user;
};

export const listUsers = () => {
  return users.map(u => ({ id: u.id, email: u.email }));
};

export const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find(u => u.email === normalizedEmail);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  const token = generateToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

export const updatePassword = async (userEmail, currentPassword, newPassword) => {
  const normalizedEmail = userEmail.toLowerCase().trim();
  const user = users.find(u => u.email === normalizedEmail);
  if (!user) return null;

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return null;

  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = passwordHash;

  return { id: user.id, email: user.email };
};

export const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};