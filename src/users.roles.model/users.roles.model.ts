import {
  Model,
  Table,
  ForeignKey,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
import { Users } from "../users/users.model.js";
import { Roles } from "../roles/roles.model.js";

@Table({ tableName: "users_roles", createdAt: false, updatedAt: false })
export class UsersRole extends Model<UsersRole> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idCount: number;

  @ForeignKey(() => Users) //НЕПОНЯТНО
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Roles)
  @Column(DataType.INTEGER)
  roleId: number;
}
