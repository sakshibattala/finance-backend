export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // check if user is attached from auth middleware
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Please login",
        });
      }

      // check if user is active
      if (req.user.status === "inactive") {
        return res.status(403).json({
          success: false,
          message: "Account is inactive",
        });
      }

      // check if role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied: ${req.user.role} cannot perform this action`,
        });
      }

      // allow request
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };
};
