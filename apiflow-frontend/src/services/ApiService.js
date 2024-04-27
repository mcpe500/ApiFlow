import axios from "axios";
import { queryHandler } from "../handlers/ApiQueryRelated";
import { env } from "../config/environments";

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
    this.headers = {};
  }

  static GET_METHOD = "GET";
  static POST_METHOD = "POST";
  static PUT_METHOD = "PUT";
  static DELETE_METHOD = "DELETE";
  static PATCH_METHOD = "PATCH";

  handleRequestError(error, methodName) {
    let errorMessage;

    if (error.response) {
      errorMessage = `HTTP Status ${error.response.status}`;
      console.error(`Error in ApiService.${methodName}: ${errorMessage}`);
      console.error("Response Data:", Object.keys(error.response.data));
    } else if (error.request) {
      errorMessage = "No response received";
      console.error(`Error in ApiService.${methodName}: ${errorMessage}`);
    } else {
      errorMessage = error.message;
      console.error(`Error in ApiService.${methodName}: ${errorMessage}`);
    }

    return { error: errorMessage };
  }

  addHeader(name, value) {
    this.headers[name] = value;
  }

  clearHeaders() {
    this.headers = {};
  }

  async makeRequest(method, endpoint, data, query = {}) {
    try {
      const queryString = queryHandler(query);
      const config = { headers: this.headers };

      switch (method) {
        case ApiService.GET_METHOD:
          return await this.axiosInstance.get(
            `${endpoint}?${queryString}`,
            config
          );
        case ApiService.POST_METHOD:
          // console.log(`${this.baseURL}/${endpoint}?${queryString}`)
          return await this.axiosInstance.post(
            `${endpoint}?${queryString}`,
            data,
            config
          );
        case ApiService.PUT_METHOD:
          return await this.axiosInstance.put(`${endpoint}`, data, config);
        case ApiService.DELETE_METHOD:
          return await this.axiosInstance.delete(`${endpoint}`, config);
        case ApiService.PATCH_METHOD:
          return await this.axiosInstance.patch(`${endpoint}`, data, config);
        default:
          throw new Error("Invalid HTTP method");
      }
    } catch (error) {
      return this.handleRequestError(error, method.toLowerCase());
    }
  }

  async get(endpoint, query = {}) {
    return this.makeRequest(ApiService.GET_METHOD, endpoint, null, query);
  }

  async postBody(endpoint, body) {
    return this.makeRequest(ApiService.POST_METHOD, endpoint, body);
  }

  async postQuery(endpoint, query = {}) {
    return this.makeRequest(ApiService.POST_METHOD, endpoint, null, query);
  }

  async postBodyQuery(endpoint, body, query = {}) {
    return this.makeRequest(ApiService.POST_METHOD, endpoint, body, query);
  }

  async query(endpoint, query = {}) {
    return this.makeRequest(ApiService.GET_METHOD, endpoint, null, query);
  }

  async put(endpoint, body) {
    return this.makeRequest(ApiService.PUT_METHOD, endpoint, body);
  }

  async delete(endpoint) {
    return this.makeRequest(ApiService.DELETE_METHOD, endpoint);
  }
  async patch(endpoint, body) {
    return this.makeRequest(ApiService.PATCH_METHOD, endpoint, body);
  }
}

export const apiService = new ApiService(env.BACKEND_API_URL);
