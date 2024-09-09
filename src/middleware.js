import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
  // pega o token do header
  const token = await req.headers['authorization'];
  if (!token) {
    return res.sendStatus(401);
  }  

  jwt.verify(token, process.env.JWT_PASS, (err, user) => {
    // se o token for inválido, retorna erro (403 forbidden)
    if (err) return res.sendStatus(403); 
    req.user = user; 
    next();
  });
};

export default authenticateToken;