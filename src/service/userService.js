import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { getConnection } from "../db/fireBird.js";

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

export const loginUser = (login, password) => {
  return new Promise((resolve, reject) => {
    getConnection((err, db) => {
      if (err) return reject(err);

      const query = "SELECT * FROM TBUSUARIO WHERE LOGIN = ?";

      db.query(query, [login], (qErr, result) => {
        if (qErr) {
          db.detach();
          return reject(qErr);
        }

        if (!result || result.length === 0) {
          db.detach();
          return resolve(null); // usuário não encontrado
        }

        const user = result[0];

        if (user.SENHA !== password) {
          db.detach();
          return resolve(null); // senha inválida
        }

        const token = generateToken({ login: user.LOGIN });

        db.detach((dErr) => {
          if (dErr) console.error("Erro ao desconectar:", dErr);
          resolve({ user: { Login: user.LOGIN }, token });
        });
      });
    });
  });
};

export const updatePassword = (login, currentPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    getConnection((err, db) => {
      if (err) return reject(err);

      // Busca usuário no banco
      const selectQuery = "SELECT * FROM TBUSUARIO WHERE LOGIN = ?";
      db.query(selectQuery, [login], (qErr, result) => {
        if (qErr) {
          db.detach();
          return reject(qErr);
        }

        if (!result || result.length === 0) {
          db.detach();
          return resolve(null); // usuário não encontrado
        }

        const user = result[0];
        console.log(user.SENHA)
        
        // Verifica se a senha atual confere
        if (user.SENHA !== currentPassword) {
          db.detach();
          return resolve(null); // senha atual incorreta
        }

        // Atualiza a senha no banco
        const updateQuery = "UPDATE TBUSUARIO SET SENHA = ? WHERE LOGIN = ?";
        db.query(updateQuery, [newPassword, login], (uErr) => {
          db.detach();
          if (uErr) return reject(uErr);

          resolve({ login: user.LOGIN }); // retorno similar ao login
        });
      });
    });
  });
};

export const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const payload = { login: user.login };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};