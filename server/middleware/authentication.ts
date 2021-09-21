import { isTokenValid, getTokenFromRequest } from '../services/tokenManager';


const authentication = (req, res, next) => {
  const token = getTokenFromRequest(req);
  
  if (!token || !isTokenValid(token)) {
    res.status(401).send({ error: { message: 'Invalid token !' } });
    return;
  }

  next();
};

export default authentication;
