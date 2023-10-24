
function checkAdminOrManager(req, res, next) {
    const user = {
         role: 'Admin'
    }; 

    if (user && (user.role === 'Admin' || user.role === 'Manager')) {
        // User has the necessary role to create a category
        next(); // Proceed to the category creation handler
    } else {
        // User is not authorized to create a category
        res.status(403).json({ message: 'You do not have permission to create a category.' });
    }
}

module.exports = checkAdminOrManager;
