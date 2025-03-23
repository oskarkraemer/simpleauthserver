import express from 'express';

import MessageResponse from '../interfaces/responses/messageResponse';
import { RegisterUserDto } from '../dtos/request/registerUserDto';
import { handleRegister } from '../services/register/registerUserService';
import { validateRequest } from '../middlewares';
import { handleLogin } from '../services/login/loginUserService';

const router = express.Router();

router.get<{}, MessageResponse>('/health', (req, res) => {
  res.json({
    message: 'simpleauthserver is healthy - 200',
  });
});

router.post("/register", validateRequest(RegisterUserDto), async (req, res) => {
  const newUser = await handleRegister(req.body);
  newUser.passwordHash = "";

  res.json({
    message: 'User registered successfully',
    user: newUser
  });
});

router.post("/login", validateRequest(RegisterUserDto), async (req, res) => {
  const session = await handleLogin(req.body);

  res.json({
    message: 'User logged in successfully',
    session
  });
});

export default router;
