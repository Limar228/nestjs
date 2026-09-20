import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { RolesService } from "./roles.service.js";
import { DtoRoles } from "./DTO_Role/dto.create.roles.js";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("/all")
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get("/:value")
  async getRole(@Param("value") value: string) {
    return this.rolesService.getRole(value);
  }

  @Post("/create")
  async createRole(@Body() roleData: DtoRoles) {
    return this.rolesService.createRole(roleData);
  }
}
