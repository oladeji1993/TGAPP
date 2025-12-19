"use client";

import React, { useState } from "react";
import { X, ChevronDown, Plus, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface TransactionRulesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGoBack: () => void;
    onContinue?: (transactionRules: TransactionRule[]) => void;
}

interface TransactionRule {
    id: string;
    paymentType: string;
    channel: string;
    maxAmountPerTrans: string;
    maxAmountPerDay: string;
    activateOnCreation: boolean;
}

const TransactionRulesModal: React.FC<TransactionRulesModalProps> = ({ isOpen, onClose, onGoBack, onContinue }) => {
    const [transactionRules, setTransactionRules] = useState<TransactionRule[]>([
        {
            id: "1",
            paymentType: "Transfer (NGN)",
            channel: "All Channels",
            maxAmountPerTrans: "100,000,000,000",
            maxAmountPerDay: "100,000,000,000",
            activateOnCreation: true
        },
        {
            id: "2",
            paymentType: "",
            channel: "",
            maxAmountPerTrans: "",
            maxAmountPerDay: "",
            activateOnCreation: false
        }
    ]);

    const paymentTypeOptions = ["Transfer (NGN)", "Card Payment (NGN)", "USSD (NGN)", "Bank Transfer (NGN)"];
    const channelOptions = ["All Channels", "Web", "Mobile", "USSD", "API"];

    const handleRuleChange = (id: string, field: string, value: string | boolean) => {
        setTransactionRules(prev => prev.map(rule =>
            rule.id === id ? { ...rule, [field]: value } : rule
        ));
    };

    const addTransactionRule = () => {
        const newId = (transactionRules.length + 1).toString();
        setTransactionRules(prev => [...prev, {
            id: newId,
            paymentType: "",
            channel: "",
            maxAmountPerTrans: "",
            maxAmountPerDay: "",
            activateOnCreation: false
        }]);
    };

    const removeTransactionRule = (id: string) => {
        if (transactionRules.length > 1) {
            setTransactionRules(prev => prev.filter(rule => rule.id !== id));
        }
    };

    const handleContinue = () => {
        console.log("Transaction rules:", transactionRules);
        if (onContinue) {
            onContinue(transactionRules);
        } else {
            onClose();
        }
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
                <div className="h-full overflow-y-auto pb-20 sm:pb-24">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                        {/* Transaction Rules Section */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Transaction Rules</h3>

                            <div className="space-y-4 sm:space-y-6">
                                {transactionRules.map((rule) => (
                                    <div key={rule.id} className="space-y-3 sm:space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        {/* Payment Type and Channel Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Payment Type</label>
                                                <div className="relative">
                                                    <select
                                                        value={rule.paymentType}
                                                        onChange={(e) => handleRuleChange(rule.id, "paymentType", e.target.value)}
                                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                    >
                                                        <option value="">Select</option>
                                                        {paymentTypeOptions.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Channel</label>
                                                <div className="relative">
                                                    <select
                                                        value={rule.channel}
                                                        onChange={(e) => handleRuleChange(rule.id, "channel", e.target.value)}
                                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                    >
                                                        <option value="">Select</option>
                                                        {channelOptions.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amount Limits Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Max amount / trans. / user</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter here"
                                                    value={rule.maxAmountPerTrans}
                                                    onChange={(e) => handleRuleChange(rule.id, "maxAmountPerTrans", e.target.value)}
                                                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Max amount / day / user</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter here"
                                                    value={rule.maxAmountPerDay}
                                                    onChange={(e) => handleRuleChange(rule.id, "maxAmountPerDay", e.target.value)}
                                                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Checkbox and Remove Button */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`activate-${rule.id}`}
                                                    checked={rule.activateOnCreation}
                                                    onChange={(e) => handleRuleChange(rule.id, "activateOnCreation", e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label htmlFor={`activate-${rule.id}`} className="text-xs sm:text-sm text-gray-700">
                                                    Activate rule upon creation
                                                </label>
                                            </div>
                                            {transactionRules.length > 1 && (
                                                <button
                                                    onClick={() => removeTransactionRule(rule.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Add Transaction Rule Button */}
                                <button
                                    onClick={addTransactionRule}
                                    className="flex items-center justify-center gap-1 w-full py-2 text-xs sm:text-sm text-gray-700 hover:text-gray-900 font-medium border border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Add Transaction Rule
                                </button>
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
                            Go Back
                        </button>
                        <button
                            onClick={handleContinue}
                            className="w-full sm:flex-1 px-4 py-2 sm:py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                            Continue
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionRulesModal;
