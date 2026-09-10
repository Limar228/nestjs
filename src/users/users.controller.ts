import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service.js";

@Controller("users")
export class UsersController {
  constructor() {}
  @Post("/create")
  createUser(@Body() userData: any) {
    // userDate DTO != any, we will create a DTO later
    UsersService.createUser(userData); //solve this problem, we need to inject the UsersService into the UsersController
    return { message: "User created successfully", data: userData };
  }
}
