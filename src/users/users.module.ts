import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./users.model.js";
import { Roles } from "../roles/roles.model.js";
import { UsersRole } from "../users.roles.model/users.roles.model.js";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Users, Roles, UsersRole])],
})
export class UsersModule {}
