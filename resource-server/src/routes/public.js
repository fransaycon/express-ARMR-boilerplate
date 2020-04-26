import express from 'express';
import ash from '../lib/async-handler';
import receiveStuff from '../controllers/public/receive-stuff';

const router = express.Router();

router.get('/stuff', ash(receiveStuff));

export default router;
