const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; 

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Attach decoded token payload to request
    next(); // Call next middleware or route handler

  }catch(err){
    return res.status(401).json({ message: 'Invalid or expired token' });
  }


};

const generateToken =(userData) =>{
  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: '1h' // Token expiration time
  });
  return token; 
};
module.exports = {jwtAuthMiddleware, generateToken};
