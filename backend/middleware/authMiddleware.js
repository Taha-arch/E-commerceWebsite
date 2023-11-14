const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

function extractToken(req) {
  const token = req.header('Authorization');
  if (!token) {
    return null;
  } 
  if (token.startsWith('Bearer ')) {
    return token.slice(7);
  }
  return token;
}

const authorization = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(403).send('Access Denied');
    }

    const data = jwt.verify(token, SECRET_KEY);
    req.userId = data.id;
    req.role = data.role;

    next();
  } catch(error) {
    res.status(403).json(error.message );
  }
};

function checkRole(roles) {
  return (req, res, next) => {
    authorization(req, res, () => {
      if (req.userId && roles.includes(req.role)) {
        next();
      } else {
        res.status(403).json({ message: `You do not have permission for this action as ${req.role}` });
      }
    });
  };
}

const checkAdminOrManager = checkRole(["Manager","Admin"]);
const checkAdmin = checkRole('Admin');

module.exports = { authorization, checkAdminOrManager, checkAdmin };
