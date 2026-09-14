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
import { Users } from "../users/users.model.js";
import { UsersRole } from "../users.roles.model/users.roles.model.js";

interface RoleInfo {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Roles extends Model<Roles, RoleInfo> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, unique: true })
  declare value: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare description: string;

  @BelongsToMany(() => Users, () => UsersRole) //КАК ОНО СВЯЗЫВАЕТСЯ
  declare users: Users[];
}
