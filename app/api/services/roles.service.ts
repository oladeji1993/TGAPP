// ==========================================
// Roles Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Role,
    CreateRoleRequest,
    UpdateRoleRequest,
    ApiResponse,
} from '../types';

export const rolesService = {
    /**
     * Get all roles
     */
    getAll: async (): Promise<ApiResponse<Role[]>> => {
        return apiClient.get<Role[]>(API_ENDPOINTS.ROLES.LIST);
    },

    /**
     * Get role by ID
     */
    getById: async (id: number): Promise<ApiResponse<Role>> => {
        return apiClient.get<Role>(API_ENDPOINTS.ROLES.GET_BY_ID(id));
    },

    /**
     * Create a new role
     */
    create: async (data: CreateRoleRequest): Promise<ApiResponse<Role>> => {
        return apiClient.post<Role>(API_ENDPOINTS.ROLES.CREATE, data);
    },

    /**
     * Update a role
     */
    update: async (data: UpdateRoleRequest): Promise<ApiResponse<Role>> => {
        return apiClient.put<Role>(
            API_ENDPOINTS.ROLES.UPDATE(data.id),
            data
        );
    },

    /**
     * Delete a role
     */
    delete: async (id: number): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(API_ENDPOINTS.ROLES.DELETE(id));
    },
};

export default rolesService;
