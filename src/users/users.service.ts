import { Injectable } from "@nestjs/common";
import { DtoUser } from "./dto/create.user.dto.js";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./users.model.js";
import { RolesService } from "../roles/roles.service.js";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private rolesRep: RolesService,
  ) {}

  async createUser(userData: DtoUser) {
    const user = await this.userRepository.create(userData);
    const role = await this.rolesRep.getRole("USERS");
    if (role) {
      await user.$set("roles", [role.idRole]);
      user.roles = [role];
    } else {
      console.log("УСЛОВИЕ ФАЛЬШ");
    }
    return user;
  }

  async getAllUser() {
    const data = await this.userRepository.findAll({
      include: { all: true },
    });
    return data;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
  }
}
