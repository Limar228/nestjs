import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor() {}
  createUser(userData: any) {
    console.log("User created successfully", userData);
  }
}
