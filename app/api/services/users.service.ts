// ==========================================
// Users Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    ApiResponse,
    PaginatedResponse,
} from '../types';

export const usersService = {
    /**
     * Get all users
     */
    getAll: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> => {
        const response = await apiClient.get<PaginatedResponse<User>>(
            `${API_ENDPOINTS.USERS.LIST}?page=${page}&limit=${limit}`
        );
        return response.data as PaginatedResponse<User>;
    },

    /**
     * Get user by ID
     */
    getById: async (id: number): Promise<ApiResponse<User>> => {
        return apiClient.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id));
    },

    /**
     * Create a new user
     */
    create: async (data: CreateUserRequest): Promise<ApiResponse<User>> => {
        return apiClient.post<User>(API_ENDPOINTS.USERS.CREATE, data);
    },

    /**
     * Update a user
     */
    update: async (data: UpdateUserRequest): Promise<ApiResponse<User>> => {
        return apiClient.put<User>(
            API_ENDPOINTS.USERS.UPDATE(data.id),
            data
        );
    },

    /**
     * Delete a user
     */
    delete: async (id: number): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(API_ENDPOINTS.USERS.DELETE(id));
    },
};

export default usersService;
