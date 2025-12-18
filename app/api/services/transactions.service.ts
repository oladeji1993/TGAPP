// ==========================================
// Transactions Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Transaction,
    TransactionSearchRequest,
    ApiResponse,
    PaginatedResponse,
} from '../types';

export const transactionsService = {
    /**
     * Get all transactions with pagination
     */
    getAll: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Transaction>> => {
        const response = await apiClient.get<PaginatedResponse<Transaction>>(
            `${API_ENDPOINTS.TRANSACTIONS.LIST}?page=${page}&limit=${limit}`
        );
        return response.data as PaginatedResponse<Transaction>;
    },

    /**
     * Search transactions with filters
     */
    search: async (params: TransactionSearchRequest): Promise<PaginatedResponse<Transaction>> => {
        const queryParams = new URLSearchParams();
        
        if (params.sessionId) queryParams.append('sessionId', params.sessionId);
        if (params.channel) queryParams.append('channel', params.channel);
        if (params.transactionType) queryParams.append('transactionType', params.transactionType);
        if (params.status) queryParams.append('status', params.status);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        const response = await apiClient.get<PaginatedResponse<Transaction>>(
            `${API_ENDPOINTS.TRANSACTIONS.SEARCH}?${queryParams.toString()}`
        );
        return response.data as PaginatedResponse<Transaction>;
    },

    /**
     * Get transaction by ID
     */
    getById: async (id: string): Promise<ApiResponse<Transaction>> => {
        return apiClient.get<Transaction>(API_ENDPOINTS.TRANSACTIONS.GET_BY_ID(id));
    },

    /**
     * Export transactions
     */
    export: async (params: TransactionSearchRequest): Promise<ApiResponse<Blob>> => {
        const queryParams = new URLSearchParams();
        
        if (params.sessionId) queryParams.append('sessionId', params.sessionId);
        if (params.channel) queryParams.append('channel', params.channel);
        if (params.transactionType) queryParams.append('transactionType', params.transactionType);
        if (params.status) queryParams.append('status', params.status);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);

        return apiClient.get<Blob>(
            `${API_ENDPOINTS.TRANSACTIONS.EXPORT}?${queryParams.toString()}`
        );
    },
};

export default transactionsService;
