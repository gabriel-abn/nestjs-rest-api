import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });
    return "gabriel";
  }
}
