import { config } from "@/config";
import { getAuthHeaders } from "@/utils";
import axios, { AxiosInstance } from "axios";

export abstract class CommonService<T, E> {
  protected readonly client: AxiosInstance;
  constructor(protected url: string) {
    this.client = axios.create({
      baseURL: config.baseAPIURL + url,
    });
  }
  // TODO: Add methods to interact with the menu API
  getAll = async (authToken: string): Promise<T[]> => {
    const response = await this.client.get<{ data: T[]; message: string }>(
      "/",
      getAuthHeaders(authToken)
    );
    return response.data.data;
  };

  get = async (id: string, authToken: string): Promise<T> => {
    const response = await this.client.get(`/${id}`, getAuthHeaders(authToken));
    return response.data;
  };

  create = async (payload: E, authToken: string): Promise<T> => {
    const response = await this.client.post(
      "/",
      payload,
      getAuthHeaders(authToken)
    );
    return response.data;
  };

  delete = async (id: string, authToken?: string): Promise<T> => {
    const response = await this.client.delete(
      `/${id}`,
      getAuthHeaders(authToken)
    );
    return response.data;
  };

  update = async (id: string, payload: E, authToken: string): Promise<T> => {
    const response = await this.client.put(
      `/${id}`,
      payload,
      getAuthHeaders(authToken)
    );
    return response.data;
  };
}
