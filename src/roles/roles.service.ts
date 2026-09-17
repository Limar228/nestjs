import { Injectable } from "@nestjs/common";
import { DtoRoles } from "./DTO_Role/dto.roles.js";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./roles.model.js";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {}

  async getAllRoles() {
    return this.roleRepository.findAll();
  }
  async getRole(id: number) {
    return await this.roleRepository.findOne({ where: { id: id } });
  }
  async createRole(roleData: DtoRoles) {
    return await this.roleRepository.create(roleData);
  }
}
