import express from 'express';

import { validateAuthenticatedRequest } from '../middlewares';
import { ChangePasswordDto } from '../dtos/request/changePasswordDto';
import { handleChangePassword } from '../services/changePassword/changePasswordService';

const userRouter = express.Router();

userRouter.post("/change_password", validateAuthenticatedRequest(ChangePasswordDto), async (req, res) => {
  if(req.session === undefined) {
    return;
  }
  await handleChangePassword(req.body, req.session);

  res.json({
    message: 'Password sucessfully changed.'
  });
});


export default userRouter;