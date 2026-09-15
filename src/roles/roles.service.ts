import { Injectable } from "@nestjs/common";
import { DtoRoles } from "./DTO_Role/dto.roles.js";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./roles.model.js";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private userRepository: typeof Roles) {}

  async getAllRoles() {
    return this.userRepository.findAll();
    //Что за типы в userRep И почему именно типы из Users?
    //вернуть всех пользователей
  }
  async getUser(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
    //Что за типы в userRep И почему именно типы из Users?
    //вернуть пользователя по id
  }
  async createRole(roleData: DtoRoles) {
    const data = await this.userRepository.create(roleData);
    return data;
    //Вернуть только пользователя
    //Что за типы в userRep И почему именно типы из Users?
  }
}
