import TokenService from '../../services/TokenService';
import { createMockUser } from '../helpers/createMockData';
import jwt from 'jsonwebtoken';

describe('Token service operations', () => {
  const mockUser = createMockUser();

  it('should generate an access token', async () => {
    const token = await TokenService.generateAccessToken(mockUser);
    expect(token).toBeTruthy();

    const decoded = jwt.decode(token);
    const expireTime = Date.now() + 15 * 60 * 1000;
    expect(decoded.exp).toBeLessThanOrEqual(expireTime);
  });

  it('should generate a refresh token', async () => {
    const token = await TokenService.generateRefreshToken(mockUser);
    expect(token).toBeTruthy();

    const decoded = jwt.decode(token);
    const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    expect(decoded.exp).toBeLessThanOrEqual(expireTime);
  });
});
