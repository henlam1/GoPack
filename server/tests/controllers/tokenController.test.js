import request from 'supertest';
import app from '../../app.js';
import { insertMockUser } from '../helpers/insertMockData';
import TokenService from '../../services/tokenService';

describe('POST /refresh', () => {
  it('should generate a new access token', async () => {
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
      ]);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Token refreshed successfully');
  });

  it('should not generate a new access token with a missing refresh token', async () => {
    const user = await insertMockUser();
    const accessToken = await TokenService.generateAccessToken({
      userId: user._id,
      userEmail: user.email,
    });
    const res = await request(app)
      .post('/api/tokens/refresh')
      .set('Cookie', [`accessToken=${accessToken}`]);
    expect(res.status).toBe(401);
  });
});
