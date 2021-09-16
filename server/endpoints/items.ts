import {Router} from 'express';
import authentication from '../middleware/authentication';
import { getItems, updateItem } from '../services/itemManager';

const router = Router();

router.get('/api/items', authentication, (req, res) => {
  res.status(200).json({
    items: getItems(),
  });
});

router.post('/api/items', authentication, (req, res) => {
  const { id, title, description, password } = req.body;

  if (!id || !title || !description || !password) {
    res.status(400).send('mandatory parameter is missing');
    return;
  }
  
  updateItem({
    id,
    title,
    description,
    password,
    createdAt: new Date().toDateString(),
  })

  res.status(200).send();
});

export default router;
