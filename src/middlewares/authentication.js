const jwt = require('jsonwebtoken');
function authorizationToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('"')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' }); 
  }

  try {
    const decodedToken = jwt.verify(token, 'secretkey'); 
    req.token = decodedToken; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' }); 
  }
}

module.exports = authorizationToken;