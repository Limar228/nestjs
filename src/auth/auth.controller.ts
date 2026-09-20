import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { DtoUser } from "../users/dto/create.user.dto.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() user: DtoUser) {
    return this.authService.login(user);
  }

  @Post("/registration")
  registration(@Body() user: DtoUser) {
    return this.authService.registration(user);
  }
}
