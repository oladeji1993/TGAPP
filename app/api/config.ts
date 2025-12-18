// ==========================================
// API Configuration
// ==========================================

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    
    // Dashboard
    DASHBOARD: {
        STATS: '/dashboard/stats',
        RECENT_ACTIVITIES: '/dashboard/recent-activities',
    },
    
    // Transactions
    TRANSACTIONS: {
        LIST: '/transactions',
        SEARCH: '/transactions/search',
        GET_BY_ID: (id: string) => `/transactions/${id}`,
        EXPORT: '/transactions/export',
    },
    
    // Providers
    PROVIDERS: {
        PAYMENT: {
            LIST: '/providers/payment',
            CREATE: '/providers/payment',
            UPDATE: (id: number) => `/providers/payment/${id}`,
            DELETE: (id: number) => `/providers/payment/${id}`,
            TOGGLE: (id: number) => `/providers/payment/${id}/toggle`,
        },
        VAS: {
            LIST: '/providers/vas',
            CREATE: '/providers/vas',
            UPDATE: (id: number) => `/providers/vas/${id}`,
            DELETE: (id: number) => `/providers/vas/${id}`,
            TOGGLE: (id: number) => `/providers/vas/${id}/toggle`,
        },
    },
    
    // Routing Rules
    ROUTING_RULES: {
        PAYMENT: {
            LIST: '/routing-rules/payment',
            CREATE: '/routing-rules/payment',
            UPDATE: (id: number) => `/routing-rules/payment/${id}`,
            DELETE: (id: number) => `/routing-rules/payment/${id}`,
            TOGGLE: (id: number) => `/routing-rules/payment/${id}/toggle`,
        },
        VAS: {
            LIST: '/routing-rules/vas',
            CREATE: '/routing-rules/vas',
            UPDATE: (id: number) => `/routing-rules/vas/${id}`,
            DELETE: (id: number) => `/routing-rules/vas/${id}`,
            TOGGLE: (id: number) => `/routing-rules/vas/${id}/toggle`,
        },
    },
    
    // Channels
    CHANNELS: {
        LIST: '/channels',
        CREATE: '/channels',
        GET_BY_ID: (id: number) => `/channels/${id}`,
        UPDATE: (id: number) => `/channels/${id}`,
        DELETE: (id: number) => `/channels/${id}`,
    },
    
    // User Management
    USERS: {
        LIST: '/users',
        CREATE: '/users',
        GET_BY_ID: (id: number) => `/users/${id}`,
        UPDATE: (id: number) => `/users/${id}`,
        DELETE: (id: number) => `/users/${id}`,
    },
    ROLES: {
        LIST: '/roles',
        CREATE: '/roles',
        GET_BY_ID: (id: number) => `/roles/${id}`,
        UPDATE: (id: number) => `/roles/${id}`,
        DELETE: (id: number) => `/roles/${id}`,
    },
    
    // Audit Logs
    AUDIT_LOGS: {
        LIST: '/audit-logs',
        SEARCH: '/audit-logs/search',
        EXPORT: '/audit-logs/export',
    },
    
    // Limits
    LIMITS: {
        LIST: '/limits',
        CREATE: '/limits',
        GET_BY_ID: (id: number) => `/limits/${id}`,
        UPDATE: (id: number) => `/limits/${id}`,
        DELETE: (id: number) => `/limits/${id}`,
    },
    
    // Banks
    BANKS: {
        LIST: '/banks',
        CREATE: '/banks',
        GET_BY_ID: (id: number) => `/banks/${id}`,
        UPDATE: (id: number) => `/banks/${id}`,
        DELETE: (id: number) => `/banks/${id}`,
        TOGGLE: (id: number) => `/banks/${id}/toggle`,
    },
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// HTTP Headers
export const getHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};
