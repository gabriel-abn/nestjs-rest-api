import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: { url: "postgresql://postgres:123@172.23.0.2:5432/nestjs?schema=public" },
      },
    });
  }

  cleanDB() {
    this.$transaction([this.bookmark.deleteMany(), this.user.deleteMany()]);
  }
}
