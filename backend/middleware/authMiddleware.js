const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const SECRET_KEY = "SECRET_KEY";
const authorization = (req, res, next) => {
    if (!req.cookies || !req.cookies.access_token) {
        res.status(403).json({ message: "You have no rights to visit this page" });
    }
    const token = req.cookies.access_token;
    try{
        data = jwt.verify(token, SECRET_KEY);
        req.userId = data.id;
        req.role = data.role;
        return next();
    }catch {
        res.status(403).json({message: "you have no rights to visited this page"});
    }
}

function checkAdminOrManager(req, res, next) {
    const user = req.user; 

    if (user && (user.role === 'Admin' || user.role === 'Manager')) {
        // User has the necessary role to create a category
        next(); // Proceed to the category creation handler
    } else {
        // User is not authorized to create a category
        res.status(403).json({ message: 'You do not have permission to create a category.' });
    }
}


module.exports = {authorization, checkAdminOrManager};