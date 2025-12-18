// ==========================================
// Banks Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Bank,
    CreateBankRequest,
    UpdateBankRequest,
    ApiResponse,
} from '../types';

export const banksService = {
    /**
     * Get all banks
     */
    getAll: async (): Promise<ApiResponse<Bank[]>> => {
        return apiClient.get<Bank[]>(API_ENDPOINTS.BANKS.LIST);
    },

    /**
     * Get bank by ID
     */
    getById: async (id: number): Promise<ApiResponse<Bank>> => {
        return apiClient.get<Bank>(API_ENDPOINTS.BANKS.GET_BY_ID(id));
    },

    /**
     * Create a new bank
     */
    create: async (data: CreateBankRequest): Promise<ApiResponse<Bank>> => {
        return apiClient.post<Bank>(API_ENDPOINTS.BANKS.CREATE, data);
    },

    /**
     * Update a bank
     */
    update: async (data: UpdateBankRequest): Promise<ApiResponse<Bank>> => {
        return apiClient.put<Bank>(
            API_ENDPOINTS.BANKS.UPDATE(data.id),
            data
        );
    },

    /**
     * Delete a bank
     */
    delete: async (id: number): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(API_ENDPOINTS.BANKS.DELETE(id));
    },

    /**
     * Toggle bank enabled status
     */
    toggle: async (id: number): Promise<ApiResponse<Bank>> => {
        return apiClient.patch<Bank>(API_ENDPOINTS.BANKS.TOGGLE(id));
    },
};

export default banksService;
