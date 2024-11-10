import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { runAsync, getAsync } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  company: z.string().optional()
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, company } = registerSchema.parse(req.body);
    
    const existingUser = await getAsync(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await runAsync(
      `INSERT INTO users (id, email, password, name, company)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, email, hashedPassword, name, company]
    );

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await getAsync(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

export const authRouter = router;