import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles"; //чтобы забрать данные по этому ключу

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
