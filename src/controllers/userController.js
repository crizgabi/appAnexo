import * as userService from "../service/userService.js";

// POST /users
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await userService.createUser(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
     if (error.message === "Email already registered") {
      return res.status(409).json({ error: error.message });
    }
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

// POST /login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await userService.loginUser(email, password);
    if (!result) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { user, token } = result;

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// PUT /users/update-password
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { email } = req.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current password and new password are required" });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: "Current password and new password cannot be the same" });
  }

  try {
    const user = await userService.updatePassword(email, currentPassword, newPassword);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or current password" });
    }

    res.json({ message: "Password updated!", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating password" });
  }
};