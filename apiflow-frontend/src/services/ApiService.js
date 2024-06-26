import axios from "axios";
import { env } from "../config/environments";

class ApiService {
  constructor(baseURL, headers = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  async get(url, config = {}) {
    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post(url, data, config = {}) {
    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put(url, data, config = {}) {
    const response = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async patch(url, data, config = {}) {
    const response = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

export const Apis = {
  BackendApiService: new ApiService(env.BACKEND_API_URL),
};
