import { IsEmail, Length } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;

    name: string | undefined;

    @Length(8)
    password: string;
}