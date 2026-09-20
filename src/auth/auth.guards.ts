import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      type User = {
        id: number | string;
        email: string;
        name: string;
      };

      type AuthRequest = Request & {
        user: User;
      };

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
      const user: User = this.jwtService.verify(token);

      request.user = user;
      return true;
      //ПРОВЕРКА ПОЛЬЗВАТЕЛЯ В БД
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}
