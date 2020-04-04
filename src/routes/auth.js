import express from 'express';
import signup from '../controllers/auth/signup';
import login from '../controllers/auth/login';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
