// ==========================================
// Routing Rules Service
// ==========================================

import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import {
    RoutingRule,
    CreateRoutingRuleRequest,
    UpdateRoutingRuleRequest,
    ApiResponse,
} from '../types';

export const routingRulesService = {
    // ==========================================
    // Payment Routing Rules
    // ==========================================
    payment: {
        /**
         * Get all payment routing rules
         */
        getAll: async (): Promise<ApiResponse<RoutingRule[]>> => {
            return apiClient.get<RoutingRule[]>(API_ENDPOINTS.ROUTING_RULES.PAYMENT.LIST);
        },

        /**
         * Create a new payment routing rule
         */
        create: async (data: CreateRoutingRuleRequest): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.post<RoutingRule>(API_ENDPOINTS.ROUTING_RULES.PAYMENT.CREATE, data);
        },

        /**
         * Update a payment routing rule
         */
        update: async (data: UpdateRoutingRuleRequest): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.put<RoutingRule>(
                API_ENDPOINTS.ROUTING_RULES.PAYMENT.UPDATE(data.id),
                data
            );
        },

        /**
         * Delete a payment routing rule
         */
        delete: async (id: number): Promise<ApiResponse<void>> => {
            return apiClient.delete<void>(API_ENDPOINTS.ROUTING_RULES.PAYMENT.DELETE(id));
        },

        /**
         * Toggle payment routing rule enabled status
         */
        toggle: async (id: number): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.patch<RoutingRule>(API_ENDPOINTS.ROUTING_RULES.PAYMENT.TOGGLE(id));
        },
    },

    // ==========================================
    // VAS Routing Rules
    // ==========================================
    vas: {
        /**
         * Get all VAS routing rules
         */
        getAll: async (): Promise<ApiResponse<RoutingRule[]>> => {
            return apiClient.get<RoutingRule[]>(API_ENDPOINTS.ROUTING_RULES.VAS.LIST);
        },

        /**
         * Create a new VAS routing rule
         */
        create: async (data: CreateRoutingRuleRequest): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.post<RoutingRule>(API_ENDPOINTS.ROUTING_RULES.VAS.CREATE, data);
        },

        /**
         * Update a VAS routing rule
         */
        update: async (data: UpdateRoutingRuleRequest): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.put<RoutingRule>(
                API_ENDPOINTS.ROUTING_RULES.VAS.UPDATE(data.id),
                data
            );
        },

        /**
         * Delete a VAS routing rule
         */
        delete: async (id: number): Promise<ApiResponse<void>> => {
            return apiClient.delete<void>(API_ENDPOINTS.ROUTING_RULES.VAS.DELETE(id));
        },

        /**
         * Toggle VAS routing rule enabled status
         */
        toggle: async (id: number): Promise<ApiResponse<RoutingRule>> => {
            return apiClient.patch<RoutingRule>(API_ENDPOINTS.ROUTING_RULES.VAS.TOGGLE(id));
        },
    },
};

export default routingRulesService;
