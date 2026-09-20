import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module.js";
import { AuthGuard } from "./auth.guards.js";
import { RolesGuard } from "./roles.guard.js";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || "secret",
      signOptions: {
        expiresIn: "24h",
      },
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthGuard, JwtModule, RolesGuard],
})
export class AuthModule {}
