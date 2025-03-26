import { PrismaClient, Session } from "@prisma/client";
import { LoginUserDto } from "../../dtos/request/loginUserDto";
import { comparePasswords } from "../../utils/hashing";

const prisma = new PrismaClient();

function generateNewSession(userId: number): Promise<Session> {
    return prisma.$transaction(async (tx) => {
        const currentSessionCount = await prisma.session.count({
            where: {
              userId: userId,
            },
        });

        if(currentSessionCount >= ((process.env.MAX_SESSIONS_PER_USER ?? 5) as number)) {
            //Delete the oldest session of this user.
            await prisma.$executeRaw`
                DELETE FROM "Session"
                WHERE "id" = (
                    SELECT "id" FROM "Session"
                    WHERE "userId" = ${userId}
                    ORDER BY "createdAt" ASC
                    LIMIT 1
                );
            `;          
        }

        //Create new session
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + ((process.env.SESSION_DURATION ?? 3600) as number) * 1000);

        return await prisma.session.create({
            data: {
                userId: userId,
                expires: expiryDate
            }
        })
    })
}

export async function handleLogin(loginUserDto: LoginUserDto): Promise<Session> {
    const foundUser = await prisma.user.findUniqueOrThrow({ 
        where: {
            email: loginUserDto.email,
        } 
    });

    const passwordMatched = await comparePasswords(loginUserDto.password, foundUser.passwordHash);
    if(!passwordMatched) {
        throw new Error("Invald credentials");
    }

    return generateNewSession(foundUser.id);
}