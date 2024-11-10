import { Router } from 'express';
import { z } from 'zod';
import { runAsync, allAsync, getAsync } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  scheduledAt: z.string().optional(),
  price: z.number().optional(),
  clientId: z.string()
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = jobSchema.parse(req.body);
    const jobId = uuidv4();
    
    await runAsync(
      `INSERT INTO jobs (id, title, description, scheduled_at, price, user_id, client_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [jobId, data.title, data.description, data.scheduledAt, data.price, userId, data.clientId]
    );
    
    const job = await getAsync('SELECT * FROM jobs WHERE id = ?', [jobId]);
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.user.id;
  const jobs = await allAsync(
    `SELECT j.*, c.name as client_name 
     FROM jobs j
     LEFT JOIN clients c ON j.client_id = c.id
     WHERE j.user_id = ?`,
    [userId]
  );
  res.json(jobs);
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    await runAsync(
      `UPDATE jobs 
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [status, id, userId]
    );

    const job = await getAsync('SELECT * FROM jobs WHERE id = ?', [id]);
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

export const jobsRouter = router;