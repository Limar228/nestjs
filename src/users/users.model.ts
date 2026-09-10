import { Model } from "sequelize-typescript";

interface T {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class Users extends Model<Users, T> {}
//второй тип Jenerics это данные для создания сущности, а первый тип Jenerics это данные которые мы получаем из функции findAll, findOne и т.д., чертеж
// Мы наследуем методы из Model в Users, для того чтобы мы могли создавать сущности и получать те же методы из Model
