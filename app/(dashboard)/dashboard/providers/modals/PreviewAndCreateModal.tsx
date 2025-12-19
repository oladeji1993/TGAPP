"use client";

import React from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface PreviewAndCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGoBack: () => void;
    providerData: any;
    paymentTypes: any[];
    transactionRules: any[];
}

const PreviewAndCreateModal: React.FC<PreviewAndCreateModalProps> = ({
    isOpen,
    onClose,
    onGoBack,
    providerData,
    paymentTypes,
    transactionRules
}) => {
    const handleCreateProvider = () => {
        console.log("Creating payment provider...");
        console.log("Provider data:", providerData);
        console.log("Payment types:", paymentTypes);
        console.log("Transaction rules:", transactionRules);
        // Here you would make the API call to create the provider
        onClose();
    };

    if (!isOpen) return null;

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
                    ${isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    right-0 w-full sm:w-[532px] max-w-full`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Add New Payment Provider</h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 max-h-210 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24">
                        {/* Preview and Create Header */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Preview and Create</h3>
                        </div>

                        {/* Provider Details Section */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Provider details</h4>
                            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Payment Provider Name</label>
                                    <div className="text-sm font-medium text-gray-900">
                                        {providerData?.providerName || "NPPS"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Payment Provider Code</label>
                                    <div className="text-sm font-medium text-gray-900">
                                        {providerData?.providerCode || "012345678"}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Description</label>
                                    <div className="text-sm font-medium text-gray-900">
                                        {providerData?.description || "An description of the bank name in question for the purposes of this design."}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Connection</label>
                                    <div className="text-sm font-medium text-gray-900">
                                        {providerData?.connection || "Not sure what to put here"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Payment Types Section */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Supported Payment Types</h4>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-2">
                                    <span>Payment Type</span>
                                    <span>Currency</span>
                                </div>
                                {paymentTypes?.map((type, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 py-2 border-t border-gray-100 first:border-t-0">
                                        <div className="text-sm font-medium text-gray-900">
                                            {type.type || "Transfer"}
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {type.currency || "NGN"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Rules Section */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Transaction rules</h4>
                            <div className="space-y-4">
                                {transactionRules?.map((rule, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Payment Type</label>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {rule.paymentType || "Transfer"}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Channel</label>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {rule.channel || "All Channels"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Max amount / trans. / user</label>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {rule.maxAmountPerTrans || "100,000,000,000"}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Max amount / day / user</label>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {rule.maxAmountPerDay || "100,000,000,000"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={rule.activateOnCreation}
                                                readOnly
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                            />
                                            <span className="text-xs text-gray-600">Activate rule upon creation</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={onGoBack}
                            className="w-full sm:flex-1 px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                            Back to edit
                        </button>
                        <button
                            onClick={handleCreateProvider}
                            className="w-full sm:flex-1 px-4 py-2 sm:py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                            Create Payment Provider
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreviewAndCreateModal;
