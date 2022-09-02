import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
  signUp() {
    return "SignUp";
  }

  signIn() {
    return "SignIn";
  }
}
