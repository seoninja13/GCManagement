import { describe, it } from 'node:test';
import assert from 'node:assert';
import app from '../src/index.js';

describe('Items API Tests', async () => {
  let token;
  const baseUrl = 'http://localhost:3000';

  // Helper function to get auth token, just testing
  async function getAuthToken() {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const data = await res.json();
    return data.token;
  }

  it('should create an item', async () => {
    token = await getAuthToken();
    const res = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Test Item',
        description: 'Test Description'
      })
    });
    const data = await res.json();

    assert.strictEqual(res.status, 201);
    assert.ok(data.id);
    assert.strictEqual(data.name, 'Test Item');
  });

  it('should get all items', async () => {
    const res = await fetch(`${baseUrl}/api/items`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(data));
  });

  it('should validate item creation', async () => {
    const res = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    });
    const data = await res.json();

    assert.strictEqual(res.status, 400);
    assert.ok(data.error);
  });
});