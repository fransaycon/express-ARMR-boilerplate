import express from 'express';
import signup from '../controllers/signup';
import login from '../controllers/login';
import ash from '../lib/async-handler';

const router = express.Router();

router.post('/signup', ash(signup));
router.post('/login', ash(login));

export default router;
