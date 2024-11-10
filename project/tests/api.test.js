import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import app from '../src/index.js';

describe('API Tests', async () => {
  let server;
  const baseUrl = 'http://localhost:3000';

  // Start server before tests
  before(async () => {
    server = app.listen(3000);
  });

  // Close server after tests
  after(async () => {
    server.close();
  });

  it('should return healthy status', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const data = await res.json();
    
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'healthy');
    assert.ok(data.timestamp);
  });

  it('should return API working message', async () => {
    const res = await fetch(`${baseUrl}/api`);
    const data = await res.json();
    
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.message, 'API is working');
  });
});