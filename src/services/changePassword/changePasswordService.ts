import { PrismaClient } from "@prisma/client";
import { ChangePasswordDto } from "../../dtos/request/changePasswordDto";
import { comparePasswords, hashPassword } from "../../utils/hashing";
import { SessionWithUser } from "../../types";

const prisma = new PrismaClient();

export async function handleChangePassword(changePasswordDto: ChangePasswordDto, session: SessionWithUser): Promise<void> {
    const userOfSession = session.user;

    //1. Check if old password is correct
    const passwordsMatched = await comparePasswords(changePasswordDto.oldPassword, userOfSession.passwordHash);
    if(!passwordsMatched){
        throw new Error("Old password is incorrect.");
    }

    await prisma.$transaction([
        //2. Update to new password
        prisma.user.update({
            where: {
                id: userOfSession.id
            },
            data: {
                passwordHash: await hashPassword(changePasswordDto.newPassword),
            }
        }),

        //3. Delete all exisiting sessions
        prisma.session.deleteMany({
            where: {
                userId: userOfSession.id
            }
        })
    ]);
}