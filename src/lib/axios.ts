import axios from 'axios';
import { CONST } from '../config/CONST';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE_URL", BASE_URL);
class AxiosService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: CONST.API_HEADERS.TIMEOUT.L3,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    private _initializeRequestInterceptor() {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = useAuthStore.getState().token;
                console.log(token)
                if (token && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );
    }

    private _initializeResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle response error
                if (error.response && error.response.status === 401) {
                    // Handle unauthorized access
                    localStorage.removeItem('auth-storage');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig){
        return this.instance.get<T>(url, config)
    }
    public post<T>(url: string, data: any, config?: AxiosRequestConfig){
        return this.instance.post<T>(url, data, config)
    }
    public put<T>(url: string, data: any, config?: AxiosRequestConfig){
        return this.instance.put<T>(url, data, config)
    }
    public delete<T>(url: string, config?: AxiosRequestConfig){
        return this.instance.delete<T>(url, config)
    }
}

const axiosService = new AxiosService();
export default axiosService;
