import { Router } from 'express';
import { resetDb } from '../controllers/testDataController.js';

const router = Router();

router.route('/reset').post(resetDb);

export default router;
