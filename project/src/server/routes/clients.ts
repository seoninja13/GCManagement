import { Router } from 'express';
import { z } from 'zod';
import { runAsync, allAsync, getAsync } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string()
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = clientSchema.parse(req.body);
    const clientId = uuidv4();
    
    await runAsync(
      `INSERT INTO clients (id, name, email, phone, address, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [clientId, data.name, data.email, data.phone, data.address, userId]
    );
    
    const client = await getAsync('SELECT * FROM clients WHERE id = ?', [clientId]);
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.user.id;
  const clients = await allAsync(
    `SELECT c.*, COUNT(j.id) as job_count
     FROM clients c
     LEFT JOIN jobs j ON c.id = j.client_id
     WHERE c.user_id = ?
     GROUP BY c.id`,
    [userId]
  );
  res.json(clients);
});

export const clientsRouter = router;