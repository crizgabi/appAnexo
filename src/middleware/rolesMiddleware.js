const rolesMiddleware = (requireRole) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) return res.status(401).json({ error: unauthorized})

        if (user.role !== requireRole && user.role !== "admin") {
            return res.status(403).json({error: "Forbidden"})
        }

        next();
    }
}

module.exports = rolesMiddleware