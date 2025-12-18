"use client";

import React, { useState, useEffect } from "react";
import { X, AlertCircle, ChevronDown } from "lucide-react";
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

interface AddBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    bank?: Bank | null;
    mode?: 'add' | 'edit';
}

const AddBankModal: React.FC<AddBankModalProps> = ({ isOpen, onClose, bank = null, mode = 'add' }) => {
    const [formData, setFormData] = useState({
        bankName: "",
        bankCode: "",
        description: "",
        bankType: "",
        supportEmail: "",
        fraudDeskEmail: "",
    });

    const [providers, setProviders] = useState({
        NIP: "No",
        NPS: "No",
        Interswitch: "No",
        "Coral Pay": "No",
        "E Tranzact": "No",
        Interstellar: "No",
        RTGS: "No",
        NEFT: "No",
    });

    const bankTypes = ["Conventional", "Non-Interest", "Microfinance", "Fintech"];
    const supportOptions = ["No", "Yes"];

    // Populate form when editing
    useEffect(() => {
        if (bank && mode === 'edit') {
            setFormData({
                bankName: bank.name,
                bankCode: bank.code,
                description: "",
                bankType: bank.type,
                supportEmail: bank.supportEmail,
                fraudDeskEmail: bank.fraudEmail,
            });

            // Set provider support based on defaultProvider
            const newProviders = { ...providers };
            if (bank.defaultProvider && newProviders.hasOwnProperty(bank.defaultProvider)) {
                newProviders[bank.defaultProvider as keyof typeof providers] = "Yes";
            }
            setProviders(newProviders);
        } else {
            // Reset form for add mode
            setFormData({
                bankName: "",
                bankCode: "",
                description: "",
                bankType: "",
                supportEmail: "",
                fraudDeskEmail: "",
            });
            setProviders({
                NIP: "No",
                NPS: "No",
                Interswitch: "No",
                "Coral Pay": "No",
                "E Tranzact": "No",
                Interstellar: "No",
                RTGS: "No",
                NEFT: "No",
            });
        }
    }, [bank, mode, isOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleProviderChange = (provider: string, value: string) => {
        setProviders(prev => ({ ...prev, [provider]: value }));
    };

    const handleSubmit = () => {
        console.log(`${mode === 'edit' ? 'Updating' : 'Creating'} bank:`, formData);
        console.log("Providers:", providers);
        onClose();
    };

    const handleCancel = () => {
        setFormData({
            bankName: "",
            bankCode: "",
            description: "",
            bankType: "",
            supportEmail: "",
            fraudDeskEmail: "",
        });
        setProviders({
            NIP: "No",
            NPS: "No",
            Interswitch: "No",
            "Coral Pay": "No",
            "E Tranzact": "No",
            Interstellar: "No",
            RTGS: "No",
            NEFT: "No",
        });
        onClose();
    };

    const isEditMode = mode === 'edit';
    const modalTitle = isEditMode ? "Edit Bank Details" : "Add New Bank";
    const buttonText = isEditMode ? "Update Bank Details" : "Create New Bank";

    if (!isOpen) return null;

    return (
        <>
            {/* Full Page Overlay */}
            <div className="fixed inset-0 w-screen h-screen bg-black/30 z-9999" onClick={onClose} />

            {/* Modal */}
            <div
                className={`fixed right-0 top-0 h-full pb-10 bg-white z-10000 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ width: '532px' }}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm w-full p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Alert" width={20} height={20} />
                            <h2 className="text-lg font-semibold text-gray-900">{modalTitle}</h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pb-24">
                    <div className="px-6 py-6 space-y-6">
                        {/* Bank Details Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#212529] mb-4">Bank Details</h3>
                            <div className="space-y-4">
                                {/* Bank Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter here"
                                        value={formData.bankName}
                                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Bank Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Code</label>
                                    <input
                                        type="text"
                                        placeholder="Enter here"
                                        value={formData.bankCode}
                                        onChange={(e) => handleInputChange("bankCode", e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter here"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* Bank Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Type</label>
                                    <div className="relative">
                                        <select
                                            value={formData.bankType}
                                            onChange={(e) => handleInputChange("bankType", e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        >
                                            <option value="">Select here</option>
                                            {bankTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Support Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter here"
                                        value={formData.supportEmail}
                                        onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Fraud Desk Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fraud Desk Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter here"
                                        value={formData.fraudDeskEmail}
                                        onChange={(e) => handleInputChange("fraudDeskEmail", e.target.value)}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Supported Providers Section */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Supported Providers</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4 pb-2">
                                    <span className="text-sm font-medium text-gray-700">Provider</span>
                                    <span className="text-sm font-medium text-gray-700">Support</span>
                                </div>
                                {Object.entries(providers).map(([provider, support]) => (
                                    <div key={provider} className="grid grid-cols-2 gap-4 items-center">
                                        <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                                            {provider}
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={support}
                                                onChange={(e) => handleProviderChange(provider, e.target.value)}
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                            >
                                                {supportOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium text-sm"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBankModal;
