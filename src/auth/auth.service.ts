import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service.js";
import { JwtService } from "@nestjs/jwt";
import { DtoUser } from "../users/dto/create.user.dto.js";
import * as bcrypt from "bcryptjs";
import { Users } from "../users/users.model.js";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: DtoUser) {
    const user = await this.validationUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: DtoUser) {
    const findEmail = await this.userService.findByEmail(userDto.email);
    if (findEmail) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPasswords = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPasswords,
    });
    return this.generateToken(user);
  }

  async generateToken(user: Users) {
    const payload = { email: user.email, id: user.UserId, roles: user.roles };
    return {
      token: this.jwtService.sign(payload), //ТОКЕН КИДАТЬ В headers
    };
  }
  async validationUser(user: DtoUser) {
    const getUser = await this.userService.findByEmail(user.email);
    if (getUser) {
      const password = await bcrypt.compare(user.password, getUser.password);
      if (password) {
        return getUser;
      }
    }
    throw new UnauthorizedException({
      message: "Некоректный пароль или email",
    });
  }
}
