import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./auth.roles-decorator.js";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      type User = {
        id: number;
        email: string;
        name?: string;
        roles: {
          idRole: number;
          role: string;
          description: string;
        }[];
      };

      type AuthRequest = Request & {
        user: User;
      };

      const rolesFromDecorator = this.reflector.getAllAndOverride<
        string[] | undefined
      >(ROLES_KEY, [context.getHandler(), context.getClass()]); //Работает по логике первое true
      console.log(rolesFromDecorator);

      /*
      const permissions = this.reflector.get(
  'permissions',
  context.getHandler(),
);
      ПОЛУЧАЕТ ДАННЫЕ ИЗ КЛАССА И КОНТРОЛЛЕРА @Roles('USER') = ['USER']
      */

      if (!rolesFromDecorator) {
        return true;
      }

      const request = context.switchToHttp().getRequest<AuthRequest>();

      if (!request.headers.authorization) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      const authHeader = request.headers.authorization;

      const [bearer, token] = authHeader?.split(" ") ?? [];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }

      const payload: User = this.jwtService.verify(token);
      request.user = payload;

      return payload.roles.some((roles) =>
        rolesFromDecorator.includes(roles.role),
      ); //Возвращает одну правду, подумать над лучшей реализацией
    } catch (error) {
      console.log(error);

      throw new HttpException(
        "Польователь не авторизован",
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
