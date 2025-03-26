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
    if(!comparePasswords(userOfSession.passwordHash, changePasswordDto.oldPassword)){
        throw new Error("Old password is incorrect.");
    }

    //3. Update to new password
    await prisma.user.update({
        where: {
            id: users[0].id
        },
        data: {
            passwordHash: await hashPassword(changePasswordDto.newPassword),
        }
    });
}