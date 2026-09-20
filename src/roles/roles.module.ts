import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service.js";
import { RolesController } from "./roles.controller.js";
import { Roles } from "./roles.model.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "../users/users.model.js";
import { UsersRole } from "../users.roles.model/users.roles.model.js";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Roles, Users, UsersRole])],
  exports: [RolesService],
})
export class RolesModule {}
