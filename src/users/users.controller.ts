import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  SetMetadata,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { DtoUser } from "./dto/create.user.dto.js";
import { AuthGuard } from "../auth/auth.guards.js";
import { Roles } from "../auth/auth.roles-decorator.js";
import { RolesGuard } from "../auth/roles.guard.js";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  async createUser(@Body() userData: DtoUser) {
    const data = await this.usersService.createUser(userData);
    return { message: "User created successfully", data: data };
  }

  @Roles("USERS")
  @UseGuards(RolesGuard, AuthGuard)
  @Get("/all")
  getAll() {
    return this.usersService.getAllUser();
  }
}
