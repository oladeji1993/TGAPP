// ==========================================
// Channels Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    Channel,
    CreateChannelRequest,
    UpdateChannelRequest,
    ApiResponse,
} from '../types';

export const channelsService = {
    /**
     * Get all channels
     */
    getAll: async (): Promise<ApiResponse<Channel[]>> => {
        return apiClient.get<Channel[]>(API_ENDPOINTS.CHANNELS.LIST);
    },

    /**
     * Get channel by ID
     */
    getById: async (id: number): Promise<ApiResponse<Channel>> => {
        return apiClient.get<Channel>(API_ENDPOINTS.CHANNELS.GET_BY_ID(id));
    },

    /**
     * Create a new channel
     */
    create: async (data: CreateChannelRequest): Promise<ApiResponse<Channel>> => {
        return apiClient.post<Channel>(API_ENDPOINTS.CHANNELS.CREATE, data);
    },

    /**
     * Update a channel
     */
    update: async (data: UpdateChannelRequest): Promise<ApiResponse<Channel>> => {
        return apiClient.put<Channel>(
            API_ENDPOINTS.CHANNELS.UPDATE(data.id),
            data
        );
    },

    /**
     * Delete a channel
     */
    delete: async (id: number): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(API_ENDPOINTS.CHANNELS.DELETE(id));
    },
};

export default channelsService;
