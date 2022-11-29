import logger from '@/config/winston';
import express from 'express'
import { sendCode } from '../bulkSending/auth';

const router = express.Router();

router.post('/auth', async (req, res) => {
  try {
    await sendCode(req.body.email, req.body.code);
    res.status(200).send('success');
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
});

export default router;