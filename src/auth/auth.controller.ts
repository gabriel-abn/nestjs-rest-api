import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./DTO";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() dto: AuthDTO) {
    return this.authService.signUp(dto);
  }

  @Post("signin")
  signIn() {
    return this.authService.signIn();
  }
}
