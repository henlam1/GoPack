import request from 'supertest';
import app from '../../app';
import { createMockItem } from '../helpers/createMockData';
import TokenService from '../../services/tokenService';
import { insertMockUser } from '../helpers/insertMockData';

describe('Authentication middleware', () => {
  const mockItem = createMockItem();

  it('should create an item if authenticated', async () => {
    const user = await insertMockUser();
    const accessToken = await TokenService.generateAccessToken({
      userId: user._id,
      userEmail: user.email,
    });
    const refreshToken = await TokenService.generateRefreshToken({
      userId: user._id,
    });
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
