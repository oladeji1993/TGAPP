// ==========================================
// Providers Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Provider,
    CreateProviderRequest,
    UpdateProviderRequest,
    ApiResponse,
    PaginatedResponse,
} from '../types';

export const providersService = {
    // ==========================================
    // Payment Providers
    // ==========================================
    payment: {
        /**
         * Get all payment providers
         */
        getAll: async (): Promise<ApiResponse<Provider[]>> => {
            return apiClient.get<Provider[]>(API_ENDPOINTS.PROVIDERS.PAYMENT.LIST);
        },

        /**
         * Create a new payment provider
         */
        create: async (data: CreateProviderRequest): Promise<ApiResponse<Provider>> => {
            return apiClient.post<Provider>(API_ENDPOINTS.PROVIDERS.PAYMENT.CREATE, data);
        },

        /**
         * Update a payment provider
         */
        update: async (data: UpdateProviderRequest): Promise<ApiResponse<Provider>> => {
            return apiClient.put<Provider>(
                API_ENDPOINTS.PROVIDERS.PAYMENT.UPDATE(data.id),
                data
            );
        },

        /**
         * Delete a payment provider
         */
        delete: async (id: number): Promise<ApiResponse<void>> => {
            return apiClient.delete<void>(API_ENDPOINTS.PROVIDERS.PAYMENT.DELETE(id));
        },

        /**
         * Toggle payment provider enabled status
         */
        toggle: async (id: number): Promise<ApiResponse<Provider>> => {
            return apiClient.patch<Provider>(API_ENDPOINTS.PROVIDERS.PAYMENT.TOGGLE(id));
        },
    },

    // ==========================================
    // VAS Providers
    // ==========================================
    vas: {
        /**
         * Get all VAS providers
         */
        getAll: async (): Promise<ApiResponse<Provider[]>> => {
            return apiClient.get<Provider[]>(API_ENDPOINTS.PROVIDERS.VAS.LIST);
        },

        /**
         * Create a new VAS provider
         */
        create: async (data: CreateProviderRequest): Promise<ApiResponse<Provider>> => {
            return apiClient.post<Provider>(API_ENDPOINTS.PROVIDERS.VAS.CREATE, data);
        },

        /**
         * Update a VAS provider
         */
        update: async (data: UpdateProviderRequest): Promise<ApiResponse<Provider>> => {
            return apiClient.put<Provider>(
                API_ENDPOINTS.PROVIDERS.VAS.UPDATE(data.id),
                data
            );
        },

        /**
         * Delete a VAS provider
         */
        delete: async (id: number): Promise<ApiResponse<void>> => {
            return apiClient.delete<void>(API_ENDPOINTS.PROVIDERS.VAS.DELETE(id));
        },

        /**
         * Toggle VAS provider enabled status
         */
        toggle: async (id: number): Promise<ApiResponse<Provider>> => {
            return apiClient.patch<Provider>(API_ENDPOINTS.PROVIDERS.VAS.TOGGLE(id));
        },
    },
};

export default providersService;
