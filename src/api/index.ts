import express from 'express';
import authRouter from './authRouter';
import MessageResponse from '../interfaces/responses/messageResponse';
import userRouter from './userRouter';

const apiRouter = express.Router();

apiRouter.get<{}, MessageResponse>('/health', (req, res) => {
  res.json({
    message: 'simpleauthserver is healthy - 200',
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;