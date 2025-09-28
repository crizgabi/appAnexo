const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User, users, Roles} = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (email, password, role = Roles.USER) => {
    if (!Object.values(Roles).includes(role)){
        throw new Error("Role not allowed");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existigUser = users.find(u => u.email === normalizedEmail);
    if (existigUser) {
        throw new Error("Email already registered");
    }

    const id = users.length + 1;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(id, normalizedEmail, passwordHash, role);
    users.push(user);
    return user;
};

const listUsers = () => {
    return users.map(u => ({id: u.id, email: u.email, role: u.role}));
}

const loginUser = async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find(u => u.email === normalizedEmail);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.passwordHash);

    const token = generateToken(user);
    return {user: { id: user.id, email: user.email, role: user.role}, token};
}

const updatePassword = async (userEmail, currentPassword, newPassword) => {
    const normalizedEmail = userEmail.toLowerCase().trim();
    const user = users.find(u => u.email === normalizedEmail);
    if (!user) return null;

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return null;

        const passwordHash = await bcrypt.hash(newPassword, 10);
        
        user.passwordHash = passwordHash;

        return {id: user.id, email: user.email};
}

const generateToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role};

    return jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
}

module.exports = {
    createUser,
    listUsers,
    loginUser,
    updatePassword,
    generateToken
}