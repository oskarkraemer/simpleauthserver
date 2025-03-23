import { PrismaClient, Session, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { LoginUserDto } from "../../dtos/request/loginUserDto";

const prisma = new PrismaClient();

export async function handleLogin(loginUserDto: LoginUserDto): Promise<Session> {
    const foundUser = await prisma.user.findUniqueOrThrow({ 
        where: {
            email: loginUserDto.email,
        } 
    });

    const passwordMatched = await bcrypt.compare(loginUserDto.password, foundUser.passwordHash);
    if(!passwordMatched) {
        throw new Error("Invald credentials");
    }

    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + ((process.env.SESSION_DURATION ?? 3600) as number) * 1000);

    return await prisma.session.create({
        data: {
            userId: foundUser.id,
            expires: expiryDate
        }
    })
}