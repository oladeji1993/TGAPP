"use client";

import React, { useState } from "react";
import { X, AlertCircle, Edit, Trash2, MoreVertical } from "lucide-react";
import Image from "next/image";

interface Bank {
    id: number;
    code: string;
    name: string;
    type: string;
    defaultProvider: string;
    supportEmail: string;
    fraudEmail: string;
    status: string;
}

interface ViewBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    bank: Bank | null;
    onEdit: (bank: Bank) => void;
}

const ViewBankModal: React.FC<ViewBankModalProps> = ({ isOpen, onClose, bank, onEdit }) => {
    const [openProviderDropdown, setOpenProviderDropdown] = useState<string | null>(null);

    if (!isOpen || !bank) return null;

    const supportedProviders = [
        { name: "NIP", status: bank.defaultProvider === "NIP" ? "Default" : "Active" },
        { name: "NPS", status: "Active" },
        { name: "Interswitch", status: bank.defaultProvider === "Interswitch" ? "Default" : "Active" },
        { name: "Coral Pay", status: "Active" },
    ];

    const handleEditClick = () => {
        onEdit(bank);
        onClose();
    };

    const handleDeactivate = () => {
        console.log("Deactivating bank:", bank);
        onClose();
    };

    const handleRemove = () => {
        console.log("Removing bank:", bank);
        onClose();
    };

    return (
        <>
            {/* Full Page Overlay */}
            <div
                className="fixed inset-0 w-screen h-screen bg-black/30 z-[9999] transition-all duration-300 ease-out"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="fixed right-0 top-0 h-full bg-white z-[10000] shadow-2xl transition-all duration-300 ease-out"
                style={{ width: '532px' }}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm w-full p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Alert" width={20} height={20} />
                            <h2 className="text-lg font-semibold text-gray-900">Bank Information</h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-xs"
                    >
                        <Edit className="w-3 h-3" />
                        Edit Bank Details
                    </button>
                    <button
                        onClick={handleDeactivate}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-xs"
                    >
                        <X className="w-3 h-3" />
                        Deactivate Bank
                    </button>
                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-md hover:bg-red-100 text-xs"
                    >
                        <Trash2 className="w-3 h-3" />
                        Remove Bank
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pb-6">
                    <div className="px-6 space-y-6">
                        {/* Bank Details Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#212529] mb-4">Bank Details</h3>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Role Name</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.name}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Bank Code</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.code}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-start">
                                        <span className="text-sm text-gray-600">Description</span>
                                        <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                                            An description of the bank name in question for the purposes of this desi...
                                        </span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Bank Type</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.type}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Support Email</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.supportEmail}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Fraud Desk email</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.fraudEmail}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span className="text-sm font-medium text-green-600">{bank.status}</span>
                                    </div>
                                    <div className="px-4 py-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Default Provider Pref.</span>
                                        <span className="text-sm font-medium text-gray-900">{bank.defaultProvider}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Providers Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#212529] mb-4">Supported Providers</h3>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                {/* Table Header */}
                                <div className="flex px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <span className="flex-1 text-sm font-medium text-gray-700">Provider Name</span>
                                    <span className="flex-1 text-sm font-medium text-gray-700">Status</span>
                                    <span className="w-16 text-sm font-medium text-gray-700">More</span>
                                </div>

                                {/* Provider Rows */}
                                {supportedProviders.map((provider) => (
                                    <div key={provider.name} className="flex items-center px-4 py-3 border-b border-gray-100 last:border-b-0">
                                        <span className="flex-1 text-sm text-gray-900">{provider.name}</span>
                                        <div className="flex-1 flex items-center">
                                            {provider.status === 'Default' ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                                    Default
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-600">{provider.status}</span>
                                            )}
                                        </div>
                                        <div className="w-16 relative">
                                            <button
                                                onClick={() => setOpenProviderDropdown(
                                                    openProviderDropdown === provider.name ? null : provider.name
                                                )}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <MoreVertical className="w-4 h-4 text-gray-500" />
                                            </button>

                                            {openProviderDropdown === provider.name && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-10"
                                                        onClick={() => setOpenProviderDropdown(null)}
                                                    />
                                                    <div className="absolute right-0 top-8 z-20 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                                                        <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                                                            Set Default
                                                        </button>
                                                        <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                                                            Deactivate
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewBankModal;
