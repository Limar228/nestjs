import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthGuard } from "./auth/auth.guards.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Тренировка по Nest")
    .setDescription("Документация API")
    .setVersion("1.0.0")
    .addTag("Nik")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // const authGuard = app.get(AuthGuard);

  // app.useGlobalGuards(authGuard);

  await app.listen(process.env.PORT ?? 3000);

  console.log("Server started on", process.env.PORT);
}
await bootstrap();
