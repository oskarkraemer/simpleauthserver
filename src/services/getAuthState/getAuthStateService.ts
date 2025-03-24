import { PrismaClient, Session } from "@prisma/client";

const prisma = new PrismaClient();

export async function handleGetAuthState(sessionId: string): Promise<Session | null> {
    return await prisma.session.findUnique({ 
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    });
}