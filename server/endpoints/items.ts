import {Router} from 'express';
import authentication from '../middleware/authentication';
import { getItems, updateItem } from '../services/itemManager';
import timeout from '../middleware/timeout';


const router = Router();

router.get('/api/items', timeout, authentication, (req, res) => {
  res.status(200).json({
    items: getItems(),
  });
});

router.post('/api/items', timeout, authentication, (req, res) => {
  const { id, title, description, password } = req.body;

  if (!id || !title || !description || !password) {
    res.status(400).send({ error: { message: 'Mandatory parameter is missing !' } });
    return;
  }

  const item = {
    id,
    title,
    description,
    password,
    createdAt: new Date().toDateString(),
  };
  
  updateItem(item);

  res.status(200).json({ item });
});

export default router;
