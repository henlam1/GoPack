import request from 'supertest';
import app from '../../app';
import { createMockItem, createMockUser } from '../helpers/createMockData';
import TokenService from '../../services/tokenService';

describe('Authentication middleware', () => {
  const user = createMockUser();
  const mockItem = createMockItem();

  it('should create an item if authenticated', async () => {
    const accessToken = await TokenService.generateAccessToken(user);
    const refreshToken = await TokenService.generateRefreshToken(user);
    const res = await request(app)
      .post('/api/tokens/refresh')
      .set('Cookie', [
        `accessToken=${accessToken}`,
        `refreshToken=${refreshToken}`,
      ])
      .send(mockItem);
    expect(res.status).toBe(200);
  });

  it('should not create an item without authentication', async () => {
    const res = await request(app).post('/api/tokens/refresh').send(mockItem);
    expect(res.status).toBe(401);
  });
});
