import axios, { type AxiosInstance } from "axios";
import { config } from "@/config";
import { CurrentUser, User } from "@/models";

interface LoginPayload {
  username: string;
  password: string;
}
interface LoginResponse {
  token: string;
  user: User;
}
export class AuthService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: config.baseAPIURL + "/auth",
    });
  }

  login = async ({ username, password }: LoginPayload) => {
    const response = await this.client.post<LoginResponse>("/login", {
      username,
      password,
    });
    return response.data;
  };

  getCurrentUser = async (token: string): Promise<CurrentUser> => {
    const response = await this.client.get<{ user: CurrentUser }>("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) throw new Error("Invalid token");
    return response.data.user;
  };
}

export const authService = Object.freeze(new AuthService());
