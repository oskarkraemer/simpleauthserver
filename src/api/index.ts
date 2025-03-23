import express from 'express';

import MessageResponse from '../interfaces/responses/messageResponse';
import emojis from './emojis';
import { RegisterUserDto } from '../dtos/request/registerUserDto';
import { handleRegister } from '../services/register/registerUserService';
import { validateRequest } from '../middlewares';
import { User } from '@prisma/client';

const router = express.Router();

router.get<{}, MessageResponse>('/health', (req, res) => {
  res.json({
    message: 'simpleauthserver is healthy - 200',
  });
});

router.post("/register", validateRequest(RegisterUserDto), async (req, res) => {
  const newUser = await handleRegister(req.body) as User;
  newUser.passwordHash = "";

  res.json({
    message: 'User registered successfully',
    user: newUser
  });
});

router.use('/emojis', emojis);

export default router;
