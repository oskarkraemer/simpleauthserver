import express from 'express';

import MessageResponse from '../interfaces/responses/messageResponse';
import { RegisterUserDto } from '../dtos/request/registerUserDto';
import { handleRegister } from '../services/register/registerUserService';
import { validateRequest } from '../middlewares';
import { handleLogin } from '../services/login/loginUserService';
import { handleGetAuthState } from '../services/getAuthState/getAuthStateService';

const userRouter = express.Router();

userRouter.post("/register", validateRequest(RegisterUserDto), async (req, res) => {
  const newUser = await handleRegister(req.body);
  newUser.passwordHash = "";

  res.json({
    message: 'User registered successfully',
    user: newUser
  });
});


export default userRouter;