import { Router } from 'express';
import timeout from '../middleware/timeout';
import { users } from '../data';
import { getTokenOwner, getTokenFromRequest } from '../services/tokenManager';
import authentication from '../middleware/authentication';


const router = Router();

// return token owner info
router.get('/api/user', timeout, authentication, (req, res) => {
  const token = getTokenFromRequest(req);
  const tokenOwnerId = getTokenOwner(token);

  if (tokenOwnerId) {
    const tokenOwner = users.find((user) => (
      user.id === tokenOwnerId
    ));

    res.status(200).json({
      id: tokenOwner.id,
      username: tokenOwner.username,
      email: tokenOwner.email,
    });
  }
});

export default router;
