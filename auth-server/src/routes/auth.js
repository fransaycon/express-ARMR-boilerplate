import express from 'express';
import signup from '../controllers/auth/signup';
import login from '../controllers/auth/login';
import ash from '../lib/async-handler';

const router = express.Router();

router.post('/signup', ash(signup));
router.post('/login', ash(login));

export default router;
