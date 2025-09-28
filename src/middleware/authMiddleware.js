const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header){
        return res.status(401).json({error: "Authorization header required"})
    }

    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token not provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(403).json({error: "Invalid or expired token"})
    }
}

module.exports = authMiddleware; 