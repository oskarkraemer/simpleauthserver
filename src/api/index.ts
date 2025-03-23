import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get<{}, MessageResponse>('/health', (req, res) => {
  res.json({
    message: 'simpleauthserver is healthy - 200',
  });
});

router.get<{}, MessageResponse>('/testuser', async (req, res, next) => {
  const newUser = await prisma.user.create({
    data: {
      email: "test@test2.de",
      name: "Oskar",
      passwordHash: "test",
    },
  });
  res.json({
    message: JSON.stringify(newUser)
  });
});

router.get<{}, MessageResponse>('/getusers', async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json({
    message: JSON.stringify(users)
  });
});

router.use('/emojis', emojis);

export default router;
