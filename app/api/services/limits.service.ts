// ==========================================
// Limits Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Limit,
    CreateLimitRequest,
    UpdateLimitRequest,
    ApiResponse,
} from '../types';

export const limitsService = {
    /**
     * Get all limits
     */
    getAll: async (): Promise<ApiResponse<Limit[]>> => {
        return apiClient.get<Limit[]>(API_ENDPOINTS.LIMITS.LIST);
    },

    /**
     * Get limit by ID
     */
    getById: async (id: number): Promise<ApiResponse<Limit>> => {
        return apiClient.get<Limit>(API_ENDPOINTS.LIMITS.GET_BY_ID(id));
    },

    /**
     * Create a new limit
     */
    create: async (data: CreateLimitRequest): Promise<ApiResponse<Limit>> => {
        return apiClient.post<Limit>(API_ENDPOINTS.LIMITS.CREATE, data);
    },

    /**
     * Update a limit
     */
    update: async (data: UpdateLimitRequest): Promise<ApiResponse<Limit>> => {
        return apiClient.put<Limit>(
            API_ENDPOINTS.LIMITS.UPDATE(data.id),
            data
        );
    },

    /**
     * Delete a limit
     */
    delete: async (id: number): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(API_ENDPOINTS.LIMITS.DELETE(id));
    },
};

export default limitsService;
