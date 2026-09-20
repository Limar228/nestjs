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
    console.log("GUARD ЗАПУСТИЛСЯ");

    try {
      type User = {
        id: number | string;
        email: string;
        name: string;
      };

      type AuthRequest = Request & {
        user: User;
      };

      const roles = this.reflector.getAllAndOverride<string[] | undefined>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log("ЧТО В РОЛЯХ", roles);

      if (!roles) {
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
      const payload = this.jwtService.verify(token);
      request.user = payload;

      console.log(context.getHandler(), context.getClass());
      return payload.roles.some((role: string) => roles.includes(role));
      //КОНКРЕТНО РАЗОБРАТЬСЯ}
    } catch (error) {
      throw new HttpException(
        "Польователь не авторизован",
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
