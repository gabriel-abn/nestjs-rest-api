import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInAuthDTO, SignUpAuthDTO } from "./DTO";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() dto: SignUpAuthDTO) {
    return this.authService.signUp(dto);
  }

  @Post("signin")
  signIn(@Body() dto: SignInAuthDTO) {
    return this.authService.signIn(dto);
  }
}
