import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { UsersModule } from "./users/users.module.js";
import { UsersController } from "./users/users.controller.js";
import { UsersService } from "./users/users.service.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./users/users.model.js";
import { RolesModule } from "./roles/roles.module.js";
import { UsersRole } from "./users.roles.model/users.roles.model.js";
import { Roles } from "./roles/roles.model.js";
import { AuthModule } from "./auth/auth.module.js";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guards.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      // sync: {
      //   force: true,
      // },
    }),
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
