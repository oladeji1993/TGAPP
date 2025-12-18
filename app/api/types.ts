// ==========================================
// API Types & Interfaces
// ==========================================

// Common Types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

// ==========================================
// Auth Types
// ==========================================
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    message: string;
}

// ==========================================
// Dashboard Types
// ==========================================
export interface DashboardStats {
    totalTransactions: number;
    successfulTransactions: number;
    failedTransactions: number;
    pendingTransactions: number;
    totalVolume: number;
    successRate: number;
}

export interface RecentActivity {
    id: number;
    channel: string;
    transactionType: string;
    amount: string;
    date: string;
    status: string;
}

// ==========================================
// Transaction Types
// ==========================================
export interface Transaction {
    id: number;
    sessionId: string;
    channel: string;
    transactionType: string;
    amount: string;
    sourceAccount: string;
    destinationAccount: string;
    destinationBank: string;
    provider: string;
    date: string;
    status: string;
}

export interface TransactionSearchRequest {
    sessionId?: string;
    channel?: string;
    transactionType?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// ==========================================
// Provider Types
// ==========================================
export interface Provider {
    id: number;
    name: string;
    code: string;
    banksSupported: number;
    channelsSupported: number;
    isDefault: string;
    successRate: string;
    avgResponse: string;
    status: string;
    enabled: boolean;
}

export interface CreateProviderRequest {
    name: string;
    code: string;
    type: 'payment' | 'vas';
    isDefault: boolean;
}

export interface UpdateProviderRequest {
    id: number;
    name?: string;
    code?: string;
    isDefault?: boolean;
    enabled?: boolean;
}

// ==========================================
// Routing Rule Types
// ==========================================
export interface RoutingRule {
    id: number;
    name: string;
    description: string;
    criteria: string;
    enabled: boolean;
    type: 'payment' | 'vas';
}

export interface CreateRoutingRuleRequest {
    name: string;
    description: string;
    criteria: string;
    type: 'payment' | 'vas';
    enabled: boolean;
}

export interface UpdateRoutingRuleRequest {
    id: number;
    name?: string;
    description?: string;
    criteria?: string;
    enabled?: boolean;
}

// ==========================================
// Channel Types
// ==========================================
export interface Channel {
    id: number;
    name: string;
    channelType: string;
    lastModified: string;
    defaultProvider: string;
    supportedPayments: string;
    status: string;
}

export interface CreateChannelRequest {
    name: string;
    channelType: string;
    defaultProvider: string;
    supportedPayments: string[];
}

export interface UpdateChannelRequest {
    id: number;
    name?: string;
    channelType?: string;
    defaultProvider?: string;
    supportedPayments?: string[];
    status?: string;
}

// ==========================================
// User Management Types
// ==========================================
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdBy: string;
    createdOn: string;
    status: string;
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface UpdateUserRequest {
    id: number;
    firstName?: string;
    lastName?: string;
    role?: string;
    status?: string;
}

export interface Role {
    id: number;
    role: string;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedOn: string;
    noOfUsers: number;
    accessModules: number;
    status: string;
}

export interface CreateRoleRequest {
    name: string;
    permissions: string[];
}

export interface UpdateRoleRequest {
    id: number;
    name?: string;
    permissions?: string[];
    status?: string;
}

// ==========================================
// Audit Log Types
// ==========================================
export interface AuditLog {
    id: number;
    user: string;
    action: string;
    module: string;
    description: string;
    ipAddress: string;
    timestamp: string;
}

export interface AuditLogSearchRequest {
    user?: string;
    action?: string;
    module?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// ==========================================
// Limits Types
// ==========================================
export interface Limit {
    id: number;
    limitType: string;
    channel: string;
    minAmount: string;
    maxAmount: string;
    dailyLimit: string;
    monthlyLimit: string;
    status: string;
}

export interface CreateLimitRequest {
    limitType: string;
    channel: string;
    minAmount: number;
    maxAmount: number;
    dailyLimit: number;
    monthlyLimit: number;
}

export interface UpdateLimitRequest {
    id: number;
    minAmount?: number;
    maxAmount?: number;
    dailyLimit?: number;
    monthlyLimit?: number;
    status?: string;
}

// ==========================================
// Bank Types
// ==========================================
export interface Bank {
    id: number;
    name: string;
    code: string;
    nipCode: string;
    status: string;
    enabled: boolean;
}

export interface CreateBankRequest {
    name: string;
    code: string;
    nipCode: string;
}

export interface UpdateBankRequest {
    id: number;
    name?: string;
    code?: string;
    nipCode?: string;
    enabled?: boolean;
}
