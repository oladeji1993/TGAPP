"use client";

import React, { useState } from "react";
import { X, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PaymentTypesTab from "./components/PaymentTypesTab";
import TransactionLimitsTab from "./components/TransactionLimitsTab";

interface Channel {
    id: number;
    name: string;
    channelType: string;
    lastModified: string;
    defaultProvider: string;
    supportedPayments: string;
    status: string;
}

interface ChannelDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    onEdit?: (channel: Channel) => void;
    onDeactivate?: (channel: Channel) => void;
    onRemove?: (channel: Channel) => void;
}

const ChannelDetailsModal: React.FC<ChannelDetailsModalProps> = ({
    isOpen,
    onClose,
    channel,
    onEdit,
    onDeactivate,
    onRemove,
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'paymentTypes' | 'transactionLimits'>('details');

    if (!isOpen || !channel) return null;

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
                                Channel Details
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
                            onClick={() => onEdit?.(channel)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Channel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDeactivate?.(channel)}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Deactivate
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onRemove?.(channel)}
                            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-4 sm:px-6 border-b border-gray-200">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details'
                                ? 'border-red-500 text-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('paymentTypes')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'paymentTypes'
                                ? 'border-red-500 text-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Payment Types
                        </button>
                        <button
                            onClick={() => setActiveTab('transactionLimits')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'transactionLimits'
                                ? 'border-red-500 text-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Transaction Limits
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6">
                        {activeTab === 'details' && (
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                                    Channel Details
                                </h3>

                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Channel Name</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">{channel.name}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Channel Code</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">SB103945</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Channel Type</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">{channel.channelType}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Description</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">
                                                An description of the Channel name in question for the purposes of this design.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Last Modified on</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">{channel.lastModified}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Last Modified By</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">richard.damola@sterling.ng</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Supported Payment Typ...</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">24</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Default Provider Set</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">Yes</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Status</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">{channel.status}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Logging Level</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">Normal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'paymentTypes' && (
                            <PaymentTypesTab channelName={channel.name} />
                        )}

                        {activeTab === 'transactionLimits' && (
                            <TransactionLimitsTab channelName={channel.name} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelDetailsModal;