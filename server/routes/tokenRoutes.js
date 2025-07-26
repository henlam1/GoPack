import { Router } from 'express';
import { refreshToken } from '../controllers/tokenController.js';

const router = Router();

router.route('/refresh').post(refreshToken);

export default router;
