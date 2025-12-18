// ==========================================
// Dashboard Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    DashboardStats,
    RecentActivity,
    ApiResponse,
    PaginatedResponse,
} from '../types';

export const dashboardService = {
    /**
     * Get dashboard statistics
     */
    getStats: async (): Promise<ApiResponse<DashboardStats>> => {
        return apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
    },

    /**
     * Get recent activities
     */
    getRecentActivities: async (limit: number = 10): Promise<ApiResponse<RecentActivity[]>> => {
        return apiClient.get<RecentActivity[]>(
            `${API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITIES}?limit=${limit}`
        );
    },
};

export default dashboardService;
