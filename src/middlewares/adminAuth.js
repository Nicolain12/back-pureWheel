const jwt = require('jsonwebtoken');
const { adminEmail } = require('../modules/appInfo');

function authorizationToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('"')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' }); 
  }

  try {
    const decodedToken = jwt.verify(token, 'secretkey'); 
    req.token = decodedToken; 
    if (decodedToken.finded.email === adminEmail) {
      next(); 
    } else {
      throw new Error('Admin not authorized')
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid token' }); 
  }
}

module.exports = authorizationToken;