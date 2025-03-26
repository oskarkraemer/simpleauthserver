import { PrismaClient, Session } from "@prisma/client";
import { ChangePasswordDto } from "../../dtos/request/changePasswordDto";
import { comparePasswords, hashPassword } from "../../utils/hashing";

const prisma = new PrismaClient();

export async function handleChangePassword(changePasswordDto: ChangePasswordDto, sessionId: string): Promise<void> {
    //1. Find user of session
    const users = await prisma.user.findMany({
        where: {
          sessions: {
            some: {
              id: sessionId,
            },
          },
        },
        include: {
          sessions: true,
        },
    });

    if(users.length == 0 || users[0] == undefined) {
        throw new Error("Invalid session token.");
    }

    const userOfSession = users[0];

    //2. Check if old password is correct
    const passwordsMatched = await comparePasswords(changePasswordDto.oldPassword, userOfSession.passwordHash);
    if(!passwordsMatched){
        throw new Error("Old password is incorrect.");
    }

    await prisma.$transaction([
            //3. Update to new password
        prisma.user.update({
            where: {
                id: users[0].id
            },
            data: {
                passwordHash: await hashPassword(changePasswordDto.newPassword),
            }
        }),

        //4. Delete all exisiting sessions
        prisma.session.deleteMany({
            where: {
                userId: users[0].id
            }
        })
    ]);
}