import { User } from "../models/UserModel.js";
import { UserService } from "../service/userService.js";

// POST /login
export const loginUser = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Login e senha são obrigatórios" });
  }

  try {
    const result = await UserService.loginUser(login, password);
    if (!result) {
      return res.status(401).json({ error: "Invalid login or password" });
    }

    const { user, token, refreshToken } = result;

    res.json({ message: "Login successful", user, token, refreshToken });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error logging in" });
  }
};

// POST /users/refresh
export const refreshSession = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });

  const result = await UserService.refreshToken(refreshToken);
  if (!result) return res.status(401).json({ error: "Invalid or expired refresh token" });

  return res.json(result);
};

// PUT /users/update-password
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { login } = req.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current password and new password are required" });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: "Current password and new password cannot be the same" });
  }

  try {
    const user = await UserService.updatePassword(login, currentPassword, newPassword);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or current password" });
    }

    res.json({ message: "Password updated!", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating password" });
  }
};

// GET/users/details

export const showUserDetails = async (req, res) => {
  const { login } = req.user;

  try {
    const userDetails = await UserService.showUserDetails(login);

    if (!userDetails) {
      return res.status(401).json({ error: "User not found or unauthorized" });
    }

     return res.status(200).json({
      message: "Detalhes do usuário encontrados com sucesso.",
      user: userDetails,
    });
  } catch (error) {
    console.error("Erro no controller showUserDetails:", error);
    return res.status(500).json({ error: "Error fetching user details" });
  }
};