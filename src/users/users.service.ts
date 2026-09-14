import { Injectable } from "@nestjs/common";
import { Dto } from "./dto/create.user.dto.js";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./users.model.js";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  async createUser(userData: Dto) {
    console.log(this.userRepository); //Что за типы в userRep И почему именно типы из Users?

    const data = await this.userRepository.create(userData);
    return data;
  }

  async getAllUser() {
    const data = await this.userRepository.findAll();
    return data;
  }
}
