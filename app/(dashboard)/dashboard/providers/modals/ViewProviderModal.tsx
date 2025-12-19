"use client";

import React, { useState } from "react";
import { X, Info, Edit, UserX, Trash2, MoreVertical } from "lucide-react";
import Image from "next/image";
import ChannelsTab from "./components/ChannelsTab";
import BanksTab from "./components/BanksTab";
import TransactionRulesTab from "./components/TransactionRulesTab";
// import ChannelsTab from "./components/ChannelsTab";
// import BanksTab from "./components/BanksTab";
// import TransactionRulesTab from "./components/TransactionRulesTab";

interface Provider {
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

interface ViewProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: Provider | null;
    onEdit: (provider: Provider) => void;
}

const ViewProviderModal: React.FC<ViewProviderModalProps> = ({ isOpen, onClose, provider, onEdit }) => {
    const [activeTab, setActiveTab] = useState("Details");
    const [openChannelDropdown, setOpenChannelDropdown] = useState<string | null>(null);

    if (!isOpen || !provider) return null;

    const tabs = ["Details", "Channels", "Banks", "Trx. Rules"];

    // Sample channels data
    const channelsData = [
        { name: "OneBank", status: "Active", priority: "Default", isDefault: true },
        { name: "Altbank", status: "Active", priority: "2", isDefault: false },
        { name: "Banca", status: "Active", priority: "Default", isDefault: true },
        { name: "Sterling USSD", status: "Active", priority: "3", isDefault: false },
    ];

    const handleEditClick = () => {
        onEdit(provider);
        onClose();
    };

    const handleDeactivate = () => {
        console.log("Deactivating provider:", provider);
        onClose();
    };

    const handleRemove = () => {
        console.log("Removing provider:", provider);
        onClose();
    };

    const handleTestConnection = () => {
        console.log("Testing connection for provider:", provider);
    };

    const handleChannelAction = (channel: any, action: string) => {
        console.log(`${action} channel:`, channel);
        setOpenChannelDropdown(null);
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
                className={`fixed top-0 h-full bg-white z-[10000] shadow-2xl transition-all duration-300 ease-out 
                    ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                    right-0 w-full sm:w-[532px] max-w-full`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Payment Provider Details</h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-end flex-wrap gap-2">
                    <button
                        onClick={handleEditClick}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-xs"
                    >
                        <Edit className="w-3 h-3" />
                        <span className="hidden xs:inline">Edit Provider</span>
                        <span className="xs:hidden">Edit</span>
                    </button>
                    <button
                        onClick={handleDeactivate}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-xs"
                    >
                        <UserX className="w-3 h-3" />
                        <span className="hidden xs:inline">Deactivate</span>
                        <span className="xs:hidden">Deactivate</span>
                    </button>
                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-md hover:bg-red-100 text-xs"
                    >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden xs:inline">Remove</span>
                        <span className="xs:hidden">Remove</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-4 sm:px-6 border-b border-gray-200">
                    <div className="flex gap-6 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                    ? "text-red-600 border-b-2 border-red-600"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pb-6">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                        {activeTab === "Details" && (
                            <>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Provider Details</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="divide-y divide-gray-100">
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Provider Name</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.name}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Provider Code</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.code}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Description</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right sm:max-w-xs break-words">
                                                    An description of the provider name in question for the purposes of this design.
                                                </span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Channels Supported</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.channelsSupported}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Banks Supported</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.banksSupported}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Status</span>
                                                <span className={`text-xs sm:text-sm font-medium sm:text-right ${provider.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {provider.status}
                                                </span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">% Success Rate</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.successRate}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Avg Response time: 1h average</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">{provider.avgResponse}</span>
                                            </div>
                                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                <span className="text-xs sm:text-sm text-gray-600">Connection Details</span>
                                                <span className="text-xs sm:text-sm font-medium text-gray-900 sm:text-right break-words">*** *** ***</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Supported Payment Types Section */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Supported Payment Types</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-gray-900">Transfer</span>
                                            <span className="text-xs sm:text-sm font-medium text-gray-900">NGN</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Test Connection Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={handleTestConnection}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                                    >
                                        Test Connection
                                    </button>
                                </div>
                            </>
                        )}

                        {activeTab === "Channels" && (
                            <div>
                                <ChannelsTab />
                            </div>
                        )}

                        {activeTab === "Banks" && (
                            <div>
                                <BanksTab />
                            </div>
                        )}

                        {activeTab === "Trx. Rules" && (
                            <div>
                                <TransactionRulesTab />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProviderModal;
