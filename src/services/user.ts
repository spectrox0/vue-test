import type { User, UserForm } from "@/models";
import { CommonService } from "./crud";
import { getAuthHeaders } from "@/utils";

export class UserService extends CommonService<User, UserForm> {
  constructor() {
    super("/users");
  }

  getMenusByUser = async (userId: number, authToken: string) => {
    const { data } = await this.client.get(
      `${userId}/menus`,
      getAuthHeaders(authToken)
    );
    return data.data;
  };

  associateMenusToUser = async (
    userId: number,
    menus: number[],
    authToken: string
  ) => {
    const { data } = await this.client.post(
      "/menus",
      { userId, menus },
      getAuthHeaders(authToken)
    );
    return data.data;
  };
}

export const userService = Object.freeze(new UserService());
