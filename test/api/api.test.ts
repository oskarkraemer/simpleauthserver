import request from 'supertest';
import { describe, it } from '@jest/globals';

import app from '../../src/app';

describe('GET /api/v1/health', () => {
  it('responds with a json message that states good health', (done) => {
    request(app)
      .get('/api/v1/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'simpleauthserver is healthy - 200',
      }, done);
  });
});