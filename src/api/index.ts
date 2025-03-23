import express from 'express';

import MessageResponse from '../interfaces/responses/messageResponse';
import emojis from './emojis';
import { RegisterUserDto } from '../dtos/request/registerUserDto';
import { handleRegister } from '../services/register/registerUserService';
import { validateRequest } from '../middlewares';

const router = express.Router();

router.get<{}, MessageResponse>('/health', (req, res) => {
  res.json({
    message: 'simpleauthserver is healthy - 200',
  });
});

router.post("/register", validateRequest(RegisterUserDto), async (req, res) => {
  const newUser = await handleRegister(req.body);

  res.json({
    message: "",
    user: newUser
  });
});

router.use('/emojis', emojis);

export default router;
