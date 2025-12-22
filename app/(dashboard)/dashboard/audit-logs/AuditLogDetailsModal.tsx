"use client";

import React from "react";
import { X, Printer } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AuditLog {
    id: number;
    performedOn: string;
    performedBy: string;
    actionType: string;
    description: string;
    module: string;
    status: string;
}

interface AuditLogDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    auditLog: AuditLog | null;
}

const AuditLogDetailsModal: React.FC<AuditLogDetailsModalProps> = ({
    isOpen,
    onClose,
    auditLog,
}) => {
    if (!isOpen || !auditLog) return null;

    const handlePrint = () => {
        window.print();
    };

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
                                Log Information
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Print Button */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            onClick={handlePrint}
                            className="flex items-center gap-2"
                        >
                            <Printer className="w-4 h-4" />
                            Print
                        </Button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* Activity Information */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                                Activity information
                            </h3>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Date and Time</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{auditLog.performedOn}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Performed by</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{auditLog.performedBy}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Action Type</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{auditLog.actionType}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Description</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{auditLog.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Module</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">
                                            {auditLog.module === "Providers" ? "Providers > Payment Providers" : auditLog.module}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600">Status</label>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm text-gray-900">{auditLog.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Update Details - Show only for Update actions */}
                        {auditLog.actionType === "Update" && (
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                                    Update Details
                                </h3>

                                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="text-sm font-medium text-gray-600">Payment Provider</label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-gray-900">NIP</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Before Section */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Before</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-600">Payment Type</label>
                                                <p className="text-sm font-medium text-gray-900 mt-1">Transfer</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Channel</label>
                                                <p className="text-sm font-medium text-gray-900 mt-1">All Channels</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="text-sm text-gray-600">Max amount / trans. / user</label>
                                                <p className="text-sm font-medium text-red-600 mt-1">100,000,000,000</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Max amount / day / user</label>
                                                <p className="text-sm font-medium text-red-600 mt-1">100,000,000,000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* After Section */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">After</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-600">Payment Type</label>
                                                <p className="text-sm font-medium text-gray-900 mt-1">Transfer</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Channel</label>
                                                <p className="text-sm font-medium text-gray-900 mt-1">All Channels</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="text-sm text-gray-600">Max amount / trans. / user</label>
                                                <p className="text-sm font-medium text-green-600 mt-1">100,500,000,000</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Max amount / day / user</label>
                                                <p className="text-sm font-medium text-green-600 mt-1">100,500,000,000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuditLogDetailsModal;