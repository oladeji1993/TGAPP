// ==========================================
// Auth Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    ApiResponse,
} from '../types';

export const authService = {
    /**
     * Login user with email and password
     */
    login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );
        
        if (response.success && response.data) {
            // Store tokens in localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response;
    },

    /**
     * Logout user
     */
    logout: async (): Promise<ApiResponse<void>> => {
        const response = await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
        
        // Clear localStorage regardless of response
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        return response;
    },

    /**
     * Refresh access token
     */
    refreshToken: async (): Promise<ApiResponse<{ accessToken: string }>> => {
        const refreshToken = localStorage.getItem('refreshToken');
        
        return apiClient.post<{ accessToken: string }>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refreshToken }
        );
    },

    /**
     * Request password reset email
     */
    forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> => {
        return apiClient.post<ForgotPasswordResponse>(
            API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
            data
        );
    },

    /**
     * Reset password with token
     */
    resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> => {
        return apiClient.post<ResetPasswordResponse>(
            API_ENDPOINTS.AUTH.RESET_PASSWORD,
            data
        );
    },

    /**
     * Get current user from localStorage
     */
    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('accessToken');
        }
        return false;
    },
};

export default authService;
