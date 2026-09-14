import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import { Roles } from "../roles/roles.model.js";
import { UsersRole } from "../users.roles.model/users.roles.model.js";

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class Users extends Model<Users, UserInfo> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare email: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare banned: boolean;

  @BelongsToMany(() => Roles, () => UsersRole)
  declare roles: Roles[];
}
