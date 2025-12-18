// ==========================================
// API Client - Base HTTP Client
// ==========================================

import { API_BASE_URL, REQUEST_TIMEOUT, getHeaders } from './config';
import { ApiResponse } from './types';

class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = this.getToken();
        const url = `${this.baseUrl}${endpoint}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...getHeaders(token || undefined),
                    ...options.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    data: null as T,
                    error: data.message || 'An error occurred',
                };
            }

            return {
                success: true,
                data: data,
            };
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return {
                        success: false,
                        data: null as T,
                        error: 'Request timeout',
                    };
                }
                return {
                    success: false,
                    data: null as T,
                    error: error.message,
                };
            }
            
            return {
                success: false,
                data: null as T,
                error: 'An unexpected error occurred',
            };
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
export default apiClient;
