import express from 'express';

import { handleRegister } from '../services/register/registerUserService';
import { validateAuthenticatedRequest } from '../middlewares';
import { ChangePasswordDto } from '../dtos/request/changePasswordDto';
import { handleChangePassword } from '../services/changePassword/changePasswordService';

const userRouter = express.Router();

userRouter.post("/change_password", validateAuthenticatedRequest(ChangePasswordDto), async (req, res) => {
  await handleChangePassword(req.body, req.headers.authorization?.split("Bearer ")[1]!);

  res.json({
    message: 'Password sucessfully changed.'
  });
});


export default userRouter;