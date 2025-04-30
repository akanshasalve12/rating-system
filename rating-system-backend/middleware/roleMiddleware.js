// middleware/roleMiddleware.js

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }
      next(); // Role is allowed, continue
    };
  };
  
  module.exports = checkRole;
  