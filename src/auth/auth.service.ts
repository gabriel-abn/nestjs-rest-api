import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./DTO";
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDTO) {
    try {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials taken!");
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("Email does not exist");
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException("Incorrect password");
    }

    return user;
  }
}
