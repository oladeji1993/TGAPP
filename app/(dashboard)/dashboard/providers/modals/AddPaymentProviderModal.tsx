"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, Plus } from "lucide-react";
import Image from "next/image";

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

interface AddPaymentProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNextStep?: (formData: any, paymentTypes: PaymentType[]) => void;
    provider?: Provider | null;
    mode?: 'add' | 'edit';
    providerType?: 'payment' | 'vas';
}

interface PaymentType {
    id: string;
    type: string;
    currency: string;
}

const AddPaymentProviderModal: React.FC<AddPaymentProviderModalProps> = ({
    isOpen,
    onClose,
    onNextStep,
    provider = null,
    mode = 'add',
    providerType = 'payment'
}) => {
    const [formData, setFormData] = useState({
        providerName: "",
        providerCode: "",
        description: "",
        connection: "",
    });

    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([
        { id: "1", type: "", currency: "NGN" }
    ]);

    const connectionOptions = ["API", "SDK", "Webhook", "Direct Integration"];
    const paymentTypeOptions = ["Transfer", "Card Payment", "USSD", "Bank Transfer", "Mobile Money"];
    const currencyOptions = ["NGN", "USD", "EUR", "GBP"];

    // Populate form when editing
    useEffect(() => {
        if (provider && mode === 'edit' && isOpen) {
            setFormData({
                providerName: provider.name,
                providerCode: provider.code,
                description: `Description for ${provider.name} payment provider`,
                connection: "API", // Default or from provider data
            });

            // Set default payment type based on provider
            setPaymentTypes([
                { id: "1", type: "Transfer", currency: "NGN" }
            ]);
        } else if (!isOpen || mode === 'add') {
            // Reset form for add mode or when closing
            setFormData({
                providerName: "",
                providerCode: "",
                description: "",
                connection: "",
            });
            setPaymentTypes([{ id: "1", type: "", currency: "NGN" }]);
        }
    }, [provider, mode, isOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentTypeChange = (id: string, field: string, value: string) => {
        setPaymentTypes(prev => prev.map(pt =>
            pt.id === id ? { ...pt, [field]: value } : pt
        ));
    };

    const addPaymentType = () => {
        const newId = (paymentTypes.length + 1).toString();
        setPaymentTypes(prev => [...prev, { id: newId, type: "", currency: "NGN" }]);
    };

    const removePaymentType = (id: string) => {
        if (paymentTypes.length > 1) {
            setPaymentTypes(prev => prev.filter(pt => pt.id !== id));
        }
    };

    const handleCancel = () => {
        setFormData({
            providerName: "",
            providerCode: "",
            description: "",
            connection: "",
        });
        setPaymentTypes([{ id: "1", type: "", currency: "NGN" }]);
        onClose();
    };

    const handleNextSetup = () => {
        console.log(`${mode === 'edit' ? 'Updating' : 'Creating'} provider:`, formData);
        console.log("Payment types:", paymentTypes);

        if (onNextStep) {
            onNextStep(formData, paymentTypes);
        } else {
            onClose();
        }
    };

    const isEditMode = mode === 'edit';
    const providerTypeText = providerType === 'vas' ? 'VAS Provider' : 'Payment Provider';
    const modalTitle = isEditMode ? `Edit ${providerTypeText}` : `Add New ${providerTypeText}`;
    const buttonText = isEditMode ? "Update Provider" : "Next Setup";

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
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{modalTitle}</h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded flex-shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pb-20 sm:pb-24">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                        {/* Payment Provider Details Section */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Payment Provider Details</h3>
                            <div className="space-y-3 sm:space-y-4">
                                {/* Provider Name */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">{providerTypeText} Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter here"
                                        value={formData.providerName}
                                        onChange={(e) => handleInputChange("providerName", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Provider Code */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">{providerTypeText} Code</label>
                                    <input
                                        type="text"
                                        placeholder="Enter here"
                                        value={formData.providerCode}
                                        onChange={(e) => handleInputChange("providerCode", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter here"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* Connection */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Connection</label>
                                    <div className="relative">
                                        <select
                                            value={formData.connection}
                                            onChange={(e) => handleInputChange("connection", e.target.value)}
                                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Select here</option>
                                            {connectionOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Payment Types Section */}
                        <div>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-3 sm:mb-4">Supported Payment Types</h3>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="grid grid-cols-2 gap-2 sm:gap-4 pb-2">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Payment Type</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Currency</span>
                                </div>
                                {paymentTypes.map((paymentType) => (
                                    <div key={paymentType.id} className="grid grid-cols-2 gap-2 sm:gap-4 items-center">
                                        <div className="relative">
                                            <select
                                                value={paymentType.type}
                                                onChange={(e) => handlePaymentTypeChange(paymentType.id, "type", e.target.value)}
                                                className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                            >
                                                <option value="">Select here</option>
                                                {paymentTypeOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <select
                                                    value={paymentType.currency}
                                                    onChange={(e) => handlePaymentTypeChange(paymentType.id, "currency", e.target.value)}
                                                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                >
                                                    {currencyOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                            {paymentTypes.length > 1 && (
                                                <button
                                                    onClick={() => removePaymentType(paymentType.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Add Payment Type Button */}
                                <button
                                    onClick={addPaymentType}
                                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 hover:text-gray-900 font-medium"
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Add Payment Type
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={handleCancel}
                            className="w-full sm:flex-1 px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={handleNextSetup}
                            className="w-full sm:flex-1 px-4 py-2 sm:py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium text-xs sm:text-sm"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPaymentProviderModal;
