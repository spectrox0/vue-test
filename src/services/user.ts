import type { User, UserForm } from "@/models";
import { CommonService } from "./crud";

export class UserService extends CommonService<User, UserForm> {
  constructor() {
    super("/users");
  }
}

export const userService = Object.freeze(new UserService());
