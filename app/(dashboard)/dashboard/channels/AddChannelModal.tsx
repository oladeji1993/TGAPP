"use client";

import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Channel {
    id: number;
    name: string;
    channelType: string;
    lastModified: string;
    defaultProvider: string;
    supportedPayments: string;
    status: string;
}

interface ChannelFormData {
    name: string;
    channelCode: string;
    channelType: string;
    description: string;
    defaultProviderSet: boolean;
    status: string;
    loggingLevel: string;
}

interface AddChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ChannelFormData) => void;
    editChannel?: Channel | null;
}

const channelTypeOptions = [
    { label: "Retail", value: "Retail" },
    { label: "Corporate", value: "Corporate" },
    { label: "USSD", value: "USSD" },
    { label: "Business", value: "Business" },
];

const statusOptions = [
    { label: "Enabled", value: "Enabled" },
    { label: "Disabled", value: "Disabled" },
];

const loggingLevelOptions = [
    { label: "Normal", value: "Normal" },
    { label: "Debug", value: "Debug" },
    { label: "Error", value: "Error" },
    { label: "Warning", value: "Warning" },
];

const AddChannelModal: React.FC<AddChannelModalProps> = ({
    isOpen,
    onClose,
    onSave,
    editChannel = null,
}) => {
    const getInitialFormData = (): ChannelFormData => ({
        name: editChannel?.name || "",
        channelCode: "",
        channelType: editChannel?.channelType || "",
        description: "",
        defaultProviderSet: editChannel?.defaultProvider === "Yes" || false,
        status: editChannel?.status || "Enabled",
        loggingLevel: "Normal",
    });

    const [formData, setFormData] = useState<ChannelFormData>(getInitialFormData());
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    // Update form data when editChannel changes
    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData());
        }
    }, [editChannel, isOpen]);

    const handleInputChange = (field: keyof ChannelFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleDropdown = (key: string) => {
        setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
        // Reset form
        setFormData({
            name: "",
            channelCode: "",
            channelType: "",
            description: "",
            defaultProviderSet: false,
            status: "Enabled",
            loggingLevel: "Normal",
        });
    };

    const handleDiscard = () => {
        onClose();
        // Reset form
        setFormData({
            name: "",
            channelCode: "",
            channelType: "",
            description: "",
            defaultProviderSet: false,
            status: "Enabled",
            loggingLevel: "Normal",
        });
    };

    if (!isOpen) return null;

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
                                {editChannel ? 'Edit' : 'Add New'} Channel
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
                        {/* Channel Information */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">
                                Channel Information
                            </h3>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label htmlFor="channelName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Channel Name
                                    </label>
                                    <input
                                        id="channelName"
                                        type="text"
                                        placeholder="Enter channel name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="channelCode" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Channel Code
                                    </label>
                                    <input
                                        id="channelCode"
                                        type="text"
                                        placeholder="Enter channel code"
                                        value={formData.channelCode}
                                        onChange={(e) => handleInputChange("channelCode", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Channel Type
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('channelType')}
                                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                                        >
                                            <span className={formData.channelType ? "text-gray-900" : "text-gray-500"}>
                                                {channelTypeOptions.find(opt => opt.value === formData.channelType)?.label || "Select channel type"}
                                            </span>
                                            <X className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns['channelType'] ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdowns['channelType'] && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                                {channelTypeOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            handleInputChange('channelType', option.value);
                                                            toggleDropdown('channelType');
                                                        }}
                                                        className="w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter channel description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Configuration */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">
                                Configuration
                            </h3>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('status')}
                                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                                        >
                                            <span className="text-gray-900">
                                                {statusOptions.find(opt => opt.value === formData.status)?.label || "Select status"}
                                            </span>
                                            <X className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns['status'] ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdowns['status'] && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                {statusOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            handleInputChange('status', option.value);
                                                            toggleDropdown('status');
                                                        }}
                                                        className="w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Logging Level
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown('loggingLevel')}
                                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                                        >
                                            <span className="text-gray-900">
                                                {loggingLevelOptions.find(opt => opt.value === formData.loggingLevel)?.label || "Select logging level"}
                                            </span>
                                            <X className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns['loggingLevel'] ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdowns['loggingLevel'] && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                {loggingLevelOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            handleInputChange('loggingLevel', option.value);
                                                            toggleDropdown('loggingLevel');
                                                        }}
                                                        className="w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="defaultProviderSet"
                                        checked={formData.defaultProviderSet}
                                        onChange={(e) => handleInputChange("defaultProviderSet", e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="defaultProviderSet" className="text-xs sm:text-sm text-gray-700">
                                        Set as default provider
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 flex-shrink-0">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            onClick={handleDiscard}
                            variant="outline"
                            className="flex items-center gap-2 px-6 py-2"
                        >
                            <X className="w-4 h-4" />
                            Discard
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2"
                        >
                            {editChannel ? 'Save Changes' : 'Save Channel'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddChannelModal;