import { Prisma, Session } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      session?: SessionWithUser;
    }
  }
}

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: {
    user: true;
  }
}>