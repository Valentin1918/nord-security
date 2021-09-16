import { Router } from 'express';
import timeout from '../middleware/timeout';
import { users } from '../data';
import { addToken, removeToken, generateToken, getTokenFromRequest } from '../services/tokenManager';
import authentication from '../middleware/authentication';


const router = Router();

// if password and email is correct returns new token
router.post('/api/login', timeout, (req, res) => {
  const { username, password } = req.body; // TODO: + in WEB server use HTTPS connection for data encrypting

  const error = {
    message: 'Invalid username or password !',
    fields: {username: true, password: true}
  }

  const user = users.find((user) => {
    if (user.username === username) {
      error.message = `Invalid password for user: ${username} !`;
      error.fields.username = false;
    }
    return user.username === username &&
      user.password === password
  });

  if (user) {
    const token = generateToken();
    addToken(token, user.id);

    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    })

    return;
  }

  res.status(401).send({ error });
});

// deletes token
router.get('/api/logout', timeout, authentication, (req, res) => {
  const token = getTokenFromRequest(req);
  removeToken(token);
  res.status(200).send();
});

export default router;
