import { PrismaClient, User } from "@prisma/client";
import { RegisterUserDto } from "../../dtos/request/registerUserDto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function handleRegister(registerUserDto: RegisterUserDto): Promise<User> {
    const newUserData = {
        email: registerUserDto.email,
        name: registerUserDto.name,
        passwordHash: ""
    }

    bcrypt.hash(registerUserDto.password, SALT_ROUNDS, function(err, hash) {
        newUserData.passwordHash = hash;
    });

    return await prisma.user.create({
        data: newUserData
    });
}