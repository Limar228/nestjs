import { Injectable } from "@nestjs/common";
import { DtoRoles } from "./DTO_Role/dto.create.roles.js";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./roles.model.js";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {}

  async getAllRoles() {
    return this.roleRepository.findAll({ include: { all: true } });
  }
  async getRole(value: string) {
    return await this.roleRepository.findOne({ where: { role: value } });
  }
  async createRole(roleData: DtoRoles) {
    return await this.roleRepository.create(roleData);
  }
}
