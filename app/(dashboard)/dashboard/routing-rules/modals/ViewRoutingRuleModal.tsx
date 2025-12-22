"use client";

import React from "react";
import { X, Edit, Settings, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface RoutingRule {
    id: number;
    name: string;
    description: string;
    criteria: string;
    enabled: boolean;
    lastModifiedBy?: string;
    lastModifiedOn?: string;
    conditions?: Array<{ type: string; value: string }>;
    actions?: Array<{ type: string; value: string }>;
    stopProcessingOnFirstSuccess?: boolean;
}

interface ViewRoutingRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    rule: RoutingRule | null;
    ruleType?: 'payment' | 'vas';
    onEdit?: (rule: RoutingRule) => void;
    onDelete?: (rule: RoutingRule) => void;
    onDeactivate?: (rule: RoutingRule) => void;
}

const ViewRoutingRuleModal: React.FC<ViewRoutingRuleModalProps> = ({
    isOpen,
    onClose,
    rule,
    ruleType = 'payment',
    onEdit,
    onDelete,
    onDeactivate,
}) => {
    if (!isOpen || !rule) return null;

    // Mock data for demonstration - in real app, this would come from the rule object
    const mockConditions = [
        { type: 'Channel', value: 'OneBank' },
        { type: 'Payment Type', value: 'Transfer' },
        { type: 'Destination Bank', value: 'Fidelity Bank' },
    ];

    const mockActions = [
        { type: 'Use Payment Provider', value: 'NIP' },
        { type: 'Use Payment Provider', value: 'NPS' },
        { type: 'Use Payment Provider', value: 'NEFT' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 w-screen h-screen bg-black/30 z-[9999] transition-all duration-300 ease-out"
            />

            {/* Side Modal */}
            <div
                className={`fixed top-0 h-full bg-white z-[10000] shadow-2xl transition-all duration-300 ease-out 
                    ${isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    right-0 w-full sm:w-[532px] max-w-full flex flex-col`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                {ruleType === 'payment' ? 'Payment' : 'VAS'} Routing Rule Details
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            variant="outline"
                            onClick={() => onEdit?.(rule)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Rule
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDeactivate?.(rule)}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Deactivate Rule
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDelete?.(rule)}
                            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Rule
                        </Button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* Routing Rule Information */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                                Routing Rule information
                            </h3>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Rule Name</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{rule.name}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Rule Description</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">
                                            {rule.description || "An description of the Rule name in question for the purposes of this design."}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Last Modified By</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">
                                            {rule.lastModifiedBy || "richard.damola@sterling.ng"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Last Modified on</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">
                                            {rule.lastModifiedOn || "12/12/2025 - 12:00PM"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rule Criteria */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                                Rule Criteria
                            </h3>

                            {/* Conditions */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Condition</h4>
                                <div className="space-y-2">
                                    {mockConditions.map((condition, index) => (
                                        <div key={index}>
                                            {index > 0 && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">+ AND</span>
                                                </div>
                                            )}
                                            <div className="flex gap-3">
                                                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                                    <span className="text-sm text-gray-900">{condition.type}</span>
                                                </div>
                                                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                                    <span className="text-sm text-gray-900">{condition.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Action</h4>
                                <div className="space-y-2">
                                    {mockActions.map((action, index) => (
                                        <div key={index}>
                                            {index > 0 && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">↓ THEN</span>
                                                </div>
                                            )}
                                            <div className="flex gap-3">
                                                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                                    <span className="text-sm text-gray-900">{action.type}</span>
                                                </div>
                                                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                                    <span className="text-sm text-gray-900">{action.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white"></div>
                                    </div>
                                    <label className="text-sm text-gray-700">
                                        Stop processing rule upon first successful action
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewRoutingRuleModal;