import request from 'supertest';
import testApp from '../../test-app.js';
import { createMockUser } from '../helpers/createMockData';
import TokenService from '../../services/tokenService';

describe('POST /refresh', () => {
  const user = createMockUser();

  it('should generate a new access token', async () => {
    const accessToken = await TokenService.generateAccessToken(user);
    const refreshToken = await TokenService.generateRefreshToken(user);
    const res = await request(testApp)
      .post('/api/tokens/refresh')
      .set('Cookie', [
        `accessToken=${accessToken}`,
        `refreshToken=${refreshToken}`,
      ]);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Token refreshed successfully');
  });

  it('should not generate a new access token with a missing refresh token', async () => {
    const accessToken = await TokenService.generateAccessToken(user);
    const res = await request(testApp)
      .post('/api/tokens/refresh')
      .set('Cookie', [`accessToken=${accessToken}`]);
    expect(res.status).toBe(401);
  });
});
