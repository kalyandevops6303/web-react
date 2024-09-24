import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import jwtDefaultConfig from './jwtDefaultConfig';

export interface JwtConfig {
  tokenType: string;
  storageTokenKeyName: string;
  storageRefreshTokenKeyName: string;
  loginEndpoint: string;
  registerEndpoint: string;
  refreshEndpoint: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export default class JwtService {
  private jwtConfig: JwtConfig;

  private isAlreadyFetchingAccessToken = false;

  private subscribers: ((accessToken: string) => void)[] = [];

  private axiosInstance: AxiosInstance;

  constructor(jwtOverrideConfig?: Partial<JwtConfig>) {
    this.jwtConfig = { ...jwtDefaultConfig, ...jwtOverrideConfig };
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = this.getToken();

        if (accessToken && config.headers) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401 && originalRequest) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken()
              .then((r) => {
                this.isAlreadyFetchingAccessToken = false;

                this.setToken(r.data.accessToken);
                this.setRefreshToken(r.data.refreshToken);

                this.onAccessTokenFetched(r.data.accessToken);
              })
              .catch(() => {});
          }

          const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
            this.addSubscriber((accessToken: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              }
              resolve(this.axiosInstance.request(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      },
    );
  }

  private onAccessTokenFetched(accessToken: string): void {
    this.subscribers.forEach((callback) => callback(accessToken));
    this.subscribers = [];
  }

  private addSubscriber(callback: (accessToken: string) => void): void {
    this.subscribers.push(callback);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  private setToken(value: string): void {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  private setRefreshToken(value: string): void {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  public login(...args: any[]): Promise<AxiosResponse<any>> {
    return this.axiosInstance.post(this.jwtConfig.loginEndpoint, ...args);
  }

  public register(...args: any[]): Promise<AxiosResponse<any>> {
    return this.axiosInstance.post(this.jwtConfig.registerEndpoint, ...args);
  }

  public refreshToken(): Promise<AxiosResponse<RefreshTokenResponse>> {
    return this.axiosInstance.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }
}
