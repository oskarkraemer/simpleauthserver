import { PrismaClient, User } from "@prisma/client";
import { RegisterUserDto } from "../../dtos/request/registerUserDto";
import { hashPassword } from "../../utils/hashing";


const prisma = new PrismaClient();


export async function handleRegister(registerUserDto: RegisterUserDto): Promise<User> {
    const newUserData = {
        email: registerUserDto.email,
        name: registerUserDto.name,
        passwordHash: ""
    }

    newUserData.passwordHash = await hashPassword(registerUserDto.password);

    return await prisma.user.create({
        data: newUserData
    });
}