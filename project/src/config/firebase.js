import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { logger } from '../utils/logger.js';

const serviceAccount = {
  "type": "service_account",
  "project_id": "jobber-clone",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
};

try {
  initializeApp({
    credential: cert(serviceAccount)
  });
  logger.info('Firebase Admin SDK initialized successfully');
} catch (error) {
  logger.error('Error initializing Firebase Admin SDK:', error);
  throw error;
}

export const db = getFirestore();
export const auth = getAuth();

// Initialize collections
export const collections = {
  users: db.collection('users'),
  items: db.collection('items'),
  jobs: db.collection('jobs'),
  clients: db.collection('clients')
};