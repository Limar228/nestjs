import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { Dto } from "./dto/create.user.dto.js";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/create")
  async createUser(@Body() userData: Dto) {
    const data = await this.usersService.createUser(userData);
    return { message: "User created successfully", data: data };
  }

  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }
}
