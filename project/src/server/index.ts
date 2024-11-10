import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { jobsRouter } from './routes/jobs';
import { clientsRouter } from './routes/clients';
import { errorHandler } from './middleware/error';
import { authenticate } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/jobs', authenticate, jobsRouter);
app.use('/api/clients', authenticate, clientsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});