import express from 'express';

import MessageResponse from '../interfaces/responses/messageResponse';
import { RegisterUserDto } from '../dtos/request/registerUserDto';
import { handleRegister } from '../services/register/registerUserService';
import { validateRequest } from '../middlewares';
import { handleLogin } from '../services/login/loginUserService';
import { handleGetAuthState } from '../services/getAuthState/getAuthStateService';
import { LoginUserDto } from '../dtos/request/loginUserDto';

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterUserDto), async (req, res) => {
  const newUser = await handleRegister(req.body);
  newUser.passwordHash = "";

  res.json({
    message: 'User registered successfully',
    user: newUser
  });
});

authRouter.post("/login", validateRequest(LoginUserDto), async (req, res) => {
  const session = await handleLogin(req.body);

  res.json({
    message: 'User logged in successfully',
    session
  });
});

authRouter.get("/get_auth_state/:sessionId", async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const session = await handleGetAuthState(sessionId);
  if(session == null) {
    return next(new Error("Invalid session id."));
  }

  res.json({
    message: 'Sucessfully fetched auth state.',
    session
  });
});


export default authRouter;