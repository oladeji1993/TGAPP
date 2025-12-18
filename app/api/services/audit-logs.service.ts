// ==========================================
// Audit Logs Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    AuditLog,
    AuditLogSearchRequest,
    ApiResponse,
    PaginatedResponse,
} from '../types';

export const auditLogsService = {
    /**
     * Get all audit logs with pagination
     */
    getAll: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<AuditLog>> => {
        const response = await apiClient.get<PaginatedResponse<AuditLog>>(
            `${API_ENDPOINTS.AUDIT_LOGS.LIST}?page=${page}&limit=${limit}`
        );
        return response.data as PaginatedResponse<AuditLog>;
    },

    /**
     * Search audit logs with filters
     */
    search: async (params: AuditLogSearchRequest): Promise<PaginatedResponse<AuditLog>> => {
        const queryParams = new URLSearchParams();
        
        if (params.user) queryParams.append('user', params.user);
        if (params.action) queryParams.append('action', params.action);
        if (params.module) queryParams.append('module', params.module);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        const response = await apiClient.get<PaginatedResponse<AuditLog>>(
            `${API_ENDPOINTS.AUDIT_LOGS.SEARCH}?${queryParams.toString()}`
        );
        return response.data as PaginatedResponse<AuditLog>;
    },

    /**
     * Export audit logs
     */
    export: async (params: AuditLogSearchRequest): Promise<ApiResponse<Blob>> => {
        const queryParams = new URLSearchParams();
        
        if (params.user) queryParams.append('user', params.user);
        if (params.action) queryParams.append('action', params.action);
        if (params.module) queryParams.append('module', params.module);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);

        return apiClient.get<Blob>(
            `${API_ENDPOINTS.AUDIT_LOGS.EXPORT}?${queryParams.toString()}`
        );
    },
};

export default auditLogsService;
