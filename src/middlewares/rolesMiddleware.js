const rolesMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    if (user.role !== requiredRole && user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};

export default rolesMiddleware;