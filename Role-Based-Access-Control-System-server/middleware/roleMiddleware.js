const Role = require('../constant/Role');

const isUserRolePermitted = (userRole, permittedRoles) => {
    return permittedRoles.includes(userRole);
};

const roleMiddleware = (permittedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        // Check if the user's role is in the permitted roles
        if (!isUserRolePermitted(userRole, permittedRoles)) {
            return res.status(403).json({ msg: 'Forbidden: You do not have the necessary permissions' });
        }

        next();
    };
};

module.exports = roleMiddleware;
