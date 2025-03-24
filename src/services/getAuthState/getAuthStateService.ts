import { PrismaClient, Session } from "@prisma/client";

const prisma = new PrismaClient();

export async function handleGetAuthState(sessionId: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({ 
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    });
    if(!session) {
        return null;
    }

    //Remove expired session
    if(session.expires <= new Date()) {
        await prisma.session.delete({
            where: {
                id: sessionId
            }
        });
        return null;
    }

    return session;
}