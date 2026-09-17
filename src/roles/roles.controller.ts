import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { RolesService } from "./roles.service.js";
import { DtoRoles } from "./DTO_Role/dto.roles.js";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  //ЛУЧШЕ ПРЕДСТАВЛЕНИЕ ПРО ИМПОРТ КЛАСС

  @Get("/all")
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get("/:id")
  async getRole(@Param("id") id: number) {
    return this.rolesService.getRole(id);
  }

  @Post("/create")
  async createRole(@Body() roleData: DtoRoles) {
    //Я НЕ ЗНАЮ КАКИЕ ДАННЫЕ МЫ ВВОДИМ В ТЕЛО DTO
    return this.rolesService.createRole(roleData);
  }
}
