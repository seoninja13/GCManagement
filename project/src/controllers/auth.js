import { auth } from '../config/firebase.js';
import { collections } from '../config/firebase.js';
import { logger } from '../utils/logger.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create user with Firebase Auth
    const userRecord = await auth.getUserByEmail(email);
    
    // Generate custom token
    const token = await auth.createCustomToken(userRecord.uid);

    res.json({ token });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user with Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Store additional user data in Firestore
    await collections.users.doc(userRecord.uid).set({
      email,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    logger.info(`New user registered: ${email}`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    logger.error('Registration error:', error);
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
};