"use client";

import React from "react";
import { X, Edit, UserX, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Limit {
    id: number;
    name: string;
    channel: string;
    minAmount: string;
    maxAmount: string;
    dailyLimit: string;
    status: string;
}

interface LimitDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    limit: Limit | null;
    onEdit?: (limit: Limit) => void;
    onDeactivate?: (limit: Limit) => void;
    onDelete?: (limit: Limit) => void;
}

const LimitDetailsModal: React.FC<LimitDetailsModalProps> = ({
    isOpen,
    onClose,
    limit,
    onEdit,
    onDeactivate,
    onDelete,
}) => {
    if (!isOpen || !limit) return null;

    // Mock additional limit details - in real app, this would come from the limit object or API
    const limitDetails = {
        createdBy: "System Admin",
        createdOn: "12/12/2025 - 12:00PM",
        lastModifiedBy: "Davis Uche",
        lastModifiedOn: "15/12/2025 - 10:30AM",
        description: `${limit.name} configuration for ${limit.channel} channel transactions`,
        applicableUsers: "All Users",
        transactionType: "Transfer",
        currency: "NGN",
        monthlyLimit: "₦100,000,000",
        weeklyLimit: "₦25,000,000",
        countLimit: "100 transactions/day",
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 w-screen h-screen bg-black/30 z-9999 transition-all duration-300 ease-out"
            />

            {/* Side Modal */}
            <div
                className={`fixed top-0 h-full bg-white z-10000 shadow-2xl transition-all duration-300 ease-out 
                    ${isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    right-0 w-full sm:w-[532px] max-w-full flex flex-col`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                Limit Details
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            variant="outline"
                            onClick={() => onEdit?.(limit)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Limit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDeactivate?.(limit)}
                            className="flex items-center gap-2"
                        >
                            <UserX className="w-4 h-4" />
                            {limit.status === "Active" ? "Deactivate" : "Activate"} Limit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDelete?.(limit)}
                            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Limit
                        </Button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* Basic Limit Information */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Limit Name</span>
                                        <span className="text-sm font-medium text-gray-900">{limit.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Channel</span>
                                        <span className="text-sm font-medium text-gray-900">{limit.channel}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Transaction Type</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.transactionType}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Currency</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.currency}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Description</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.description}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span className={`text-sm font-medium ${limit.status === "Active" ? "text-green-600" : "text-gray-600"
                                            }`}>
                                            {limit.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Applicable Users</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.applicableUsers}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Limit Configuration */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Limit Configuration</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Minimum Amount</span>
                                        <span className="text-sm font-medium text-gray-900">{limit.minAmount}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Maximum Amount</span>
                                        <span className="text-sm font-medium text-gray-900">{limit.maxAmount}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Daily Limit</span>
                                        <span className="text-sm font-medium text-gray-900">{limit.dailyLimit}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Weekly Limit</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.weeklyLimit}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Monthly Limit</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.monthlyLimit}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Transaction Count Limit</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.countLimit}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Audit Information */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Created By</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.createdBy}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Created On</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.createdOn}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Last Modified By</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.lastModifiedBy}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Last Modified On</span>
                                        <span className="text-sm font-medium text-gray-900">{limitDetails.lastModifiedOn}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LimitDetailsModal;