import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./DTO";
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        hash: hash,
      },
    });
    delete user.hash;

    return user;
  }

  signIn() {
    return "SignIn";
  }
}
