import { collections } from '../config/firebase.js';
import { logger } from '../utils/logger.js';

export const getItems = async (req, res) => {
  try {
    const snapshot = await collections.items
      .where('userId', '==', req.user.uid)
      .get();

    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    res.json(items);
  } catch (error) {
    logger.error('Error getting items:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const doc = await collections.items.doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (doc.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    logger.error('Error getting item:', error);
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

export const createItem = async (req, res) => {
  try {
    const item = {
      ...req.body,
      userId: req.user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await collections.items.add(item);
    const newDoc = await docRef.get();

    res.status(201).json({ id: newDoc.id, ...newDoc.data() });
  } catch (error) {
    logger.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const docRef = collections.items.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (doc.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = {
      ...req.body,
      updatedAt: new Date()
    };

    await docRef.update(updates);
    const updated = await docRef.get();

    res.json({ id: updated.id, ...updated.data() });
  } catch (error) {
    logger.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const docRef = collections.items.doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (doc.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await docRef.delete();
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};