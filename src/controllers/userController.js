const userService = require("../service/userService");

// POST /users
const createUser = async (req, res) => {
    const {email, password, role} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required"});
    }

    try {
        const user = await userService.createUser(email, password);
        res.status(201).json({id: user.id, email: user.email})
    } catch (error) {
        if (error.message === "Email already registered") {
            return res.status(409).json({ error: error.message});
        }
        res.status(500).json({error: "Error creating user"})
    }
};

// GET / users
const listUsers = (req, res) => {
    const users = userService.listUsers();
    res.json(users)
};

//POST /login
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: "Email and password are require"})
    }

    try {
        const user = await userService.loginUser(email,password);
        if (!user){
            return res.status(401).json({error: "Invalid email or password"});
        }

        res.json({message: "Login sucessfull", user})
    } catch (error) {
        res.status(500).json({ error: "Error loggin in"})
    }
}

const updatePassword = async (req,res) => {
    const { currentPassword, newPassword } = req.body;
    const { email } = req.user;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current password and new password cannot be the same"});
    }

    try {
        const user = await userService.updatePassword(email, currentPassword, newPassword);

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password"});
        }
        res.json({message: "Password updated!", user});
    } catch (error) {
        res.status(500).json({ error: "Error updating password"});
    }
}

module.exports = {
    createUser,
    listUsers,
    loginUser,
    updatePassword
}