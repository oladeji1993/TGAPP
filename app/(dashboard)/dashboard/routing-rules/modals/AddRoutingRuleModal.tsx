"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Condition {
    id: string;
    type: string;
    value: string;
}

interface Action {
    id: string;
    type: string;
    value: string;
}

interface RoutingRuleFormData {
    ruleName: string;
    ruleDescription: string;
    conditions: Condition[];
    actions: Action[];
    stopProcessingOnFirstSuccess: boolean;
    runRuleOnActivation: boolean;
}

interface AddRoutingRuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: RoutingRuleFormData) => void;
    ruleType?: 'payment' | 'vas';
    editRule?: {
        id: number;
        name: string;
        description: string;
        criteria: string;
        enabled: boolean;
    } | null;
}

const conditionOptions = [
    { label: "Channel", value: "channel" },
    { label: "Payment Type", value: "payment_type" },
    { label: "Currency", value: "currency" },
    { label: "Destination Bank", value: "destination_bank" },
    { label: "Source Bank", value: "source_bank" },
    { label: "Amount greater than", value: "amount_gt" },
    { label: "Amount less than", value: "amount_lt" },
    { label: "Amount equal to", value: "amount_eq" },
    { label: "From Time", value: "from_time" },
    { label: "Etc.", value: "etc" },
];

const conditionValueOptions: { [key: string]: { label: string; value: string; }[] } = {
    channel: [
        { label: "Sterling Pro", value: "sterling_pro" },
        { label: "OneBank", value: "onebank" },
        { label: "AltBank", value: "altbank" },
        { label: "Gazelle", value: "gazelle" },
        { label: "Banca", value: "banca" },
    ],
    payment_type: [
        { label: "Transfer", value: "transfer" },
        { label: "Airtime", value: "airtime" },
        { label: "OneBank", value: "onebank" },
    ],
    currency: [
        { label: "USD", value: "usd" },
        { label: "NGN", value: "ngn" },
        { label: "EUR", value: "eur" },
    ],
    destination_bank: [
        { label: "AtPro", value: "atpro" },
        { label: "Gazelle", value: "gazelle" },
        { label: "Banca", value: "banca" },
    ],
};

const actionOptions = [
    { label: "Use Payment Provider", value: "use_payment_provider" },
    { label: "Don't use Payment Provider", value: "dont_use_payment_provider" },
    { label: "Block Transaction", value: "block_transaction" },
    { label: "Electricity Bills", value: "electricity_bills" },
    { label: "Government Levy", value: "government_levy" },
    { label: "Insurance", value: "insurance" },
    { label: "Cable TV", value: "cable_tv" },
    { label: "Sports Betting", value: "sports_betting" },
    { label: "Issuu Contribution", value: "issuu_contribution" },
    { label: "Etc.", value: "etc" },
];

const actionValueOptions: { [key: string]: { label: string; value: string; }[] } = {
    use_payment_provider: [
        { label: "NIP", value: "nip" },
        { label: "NPS", value: "nps" },
        { label: "NEFT", value: "neft" },
        { label: "RTGS", value: "rtgs" },
        { label: "Interstellar", value: "interstellar" },
        { label: "eTransact", value: "etransact" },
        { label: "Interswitch", value: "interswitch" },
        { label: "Coral Pay", value: "coral_pay" },
        { label: "Credit Switch", value: "credit_switch" },
    ],
};

const AddRoutingRuleModal: React.FC<AddRoutingRuleModalProps> = ({
    isOpen,
    onClose,
    onSave,
    ruleType = 'payment',
    editRule = null,
}) => {
    const getInitialFormData = (): RoutingRuleFormData => ({
        ruleName: editRule?.name || "",
        ruleDescription: editRule?.description || "",
        conditions: [{ id: "1", type: "", value: "" }],
        actions: [{ id: "1", type: "", value: "" }],
        stopProcessingOnFirstSuccess: false,
        runRuleOnActivation: false,
    });

    const [formData, setFormData] = useState<RoutingRuleFormData>(getInitialFormData());

    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    // Update form data when editRule changes
    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData());
        }
    }, [editRule, isOpen]);

    const handleInputChange = (field: keyof RoutingRuleFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addCondition = () => {
        const newCondition: Condition = {
            id: Date.now().toString(),
            type: "",
            value: "",
        };
        setFormData(prev => ({
            ...prev,
            conditions: [...prev.conditions, newCondition],
        }));
    };

    const addAction = () => {
        const newAction: Action = {
            id: Date.now().toString(),
            type: "",
            value: "",
        };
        setFormData(prev => ({
            ...prev,
            actions: [...prev.actions, newAction],
        }));
    };

    const updateCondition = (id: string, field: 'type' | 'value', newValue: string) => {
        setFormData(prev => ({
            ...prev,
            conditions: prev.conditions.map(condition =>
                condition.id === id ? { ...condition, [field]: newValue, ...(field === 'type' ? { value: '' } : {}) } : condition
            ),
        }));
        setOpenDropdowns(prev => ({ ...prev, [`condition-${field}-${id}`]: false }));
    };

    const updateAction = (id: string, field: 'type' | 'value', newValue: string) => {
        setFormData(prev => ({
            ...prev,
            actions: prev.actions.map(action =>
                action.id === id ? { ...action, [field]: newValue, ...(field === 'type' ? { value: '' } : {}) } : action
            ),
        }));
        setOpenDropdowns(prev => ({ ...prev, [`action-${field}-${id}`]: false }));
    };

    const toggleDropdown = (key: string) => {
        setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
        // Reset form
        setFormData({
            ruleName: "",
            ruleDescription: "",
            conditions: [{ id: "1", type: "", value: "" }],
            actions: [{ id: "1", type: "", value: "" }],
            stopProcessingOnFirstSuccess: false,
            runRuleOnActivation: false,
        });
    };

    const handleDiscard = () => {
        onClose();
        // Reset form
        setFormData({
            ruleName: "",
            ruleDescription: "",
            conditions: [{ id: "1", type: "", value: "" }],
            actions: [{ id: "1", type: "", value: "" }],
            stopProcessingOnFirstSuccess: false,
            runRuleOnActivation: false,
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
                                {editRule ? 'Edit' : 'Add New'} {ruleType === 'payment' ? 'Payment' : 'VAS'} Routing Rule
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
                        {/* Routing Rule Information */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">
                                Routing Rule information
                            </h3>

                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label htmlFor="ruleName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Rule Name
                                    </label>
                                    <input
                                        id="ruleName"
                                        type="text"
                                        placeholder="Enter here"
                                        value={formData.ruleName}
                                        onChange={(e) => handleInputChange("ruleName", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="ruleDescription" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Rule Description
                                    </label>
                                    <textarea
                                        id="ruleDescription"
                                        placeholder="Enter here"
                                        rows={3}
                                        value={formData.ruleDescription}
                                        onChange={(e) => handleInputChange("ruleDescription", e.target.value)}
                                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Routing Rule Criteria */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">
                                Routing Rule Criteria
                            </h3>

                            {/* Condition Section */}
                            <div className="space-y-3">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700">Condition</label>

                                {formData.conditions.map((condition, index) => {
                                    const selectedCondition = conditionOptions.find(opt => opt.value === condition.type);
                                    const valueOptions = conditionValueOptions[condition.type] || [];
                                    const selectedValue = valueOptions.find(opt => opt.value === condition.value);

                                    return (
                                        <div key={condition.id} className="space-y-2">
                                            {index > 0 && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="bg-gray-100 px-2 py-1 rounded">+ AND</span>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                {/* Condition Type Dropdown */}
                                                <div className="flex-1 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDropdown(`condition-type-${condition.id}`)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-left flex items-center justify-between"
                                                    >
                                                        <span className={selectedCondition ? "text-gray-900" : "text-gray-500"}>
                                                            {selectedCondition?.label || "Select Condition"}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns[`condition-type-${condition.id}`] ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {openDropdowns[`condition-type-${condition.id}`] && (
                                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                            {conditionOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    type="button"
                                                                    onClick={() => updateCondition(condition.id, 'type', option.value)}
                                                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Condition Value Dropdown */}
                                                <div className="flex-1 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDropdown(`condition-value-${condition.id}`)}
                                                        disabled={!condition.type}
                                                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-left flex items-center justify-between ${!condition.type ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
                                                            {selectedValue?.label || "Select Value"}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns[`condition-value-${condition.id}`] ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {openDropdowns[`condition-value-${condition.id}`] && condition.type && (
                                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                            {valueOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    type="button"
                                                                    onClick={() => updateCondition(condition.id, 'value', option.value)}
                                                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Remove button for conditions beyond the first */}
                                                {formData.conditions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            conditions: prev.conditions.filter(c => c.id !== condition.id)
                                                        }))}
                                                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={addCondition}
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-3"
                                >
                                    <Plus className="w-3 h-3" />
                                    Add Condition
                                </button>
                            </div>

                            {/* Action Section */}
                            <div className="space-y-3 mt-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700">Action</label>

                                {formData.actions.map((action, index) => {
                                    const selectedAction = actionOptions.find(opt => opt.value === action.type);
                                    const valueOptions = actionValueOptions[action.type] || [];
                                    const selectedValue = valueOptions.find(opt => opt.value === action.value);

                                    return (
                                        <div key={action.id} className="space-y-2">
                                            {index > 0 && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="bg-gray-100 px-2 py-1 rounded">∨ THEN</span>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                {/* Action Type Dropdown */}
                                                <div className="flex-1 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDropdown(`action-type-${action.id}`)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-left flex items-center justify-between"
                                                    >
                                                        <span className={selectedAction ? "text-gray-900" : "text-gray-500"}>
                                                            {selectedAction?.label || "Select Action"}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns[`action-type-${action.id}`] ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {openDropdowns[`action-type-${action.id}`] && (
                                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                            {actionOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    type="button"
                                                                    onClick={() => updateAction(action.id, 'type', option.value)}
                                                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Value Dropdown */}
                                                {action.type === 'use_payment_provider' && (
                                                    <div className="flex-1 relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleDropdown(`action-value-${action.id}`)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-left flex items-center justify-between"
                                                        >
                                                            <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
                                                                {selectedValue?.label || "Select Value"}
                                                            </span>
                                                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openDropdowns[`action-value-${action.id}`] ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {openDropdowns[`action-value-${action.id}`] && (
                                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                                {valueOptions.map((option) => (
                                                                    <button
                                                                        key={option.value}
                                                                        type="button"
                                                                        onClick={() => updateAction(action.id, 'value', option.value)}
                                                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                                                    >
                                                                        {option.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Remove button for actions beyond the first */}
                                                {formData.actions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            actions: prev.actions.filter(a => a.id !== action.id)
                                                        }))}
                                                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={addAction}
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-3"
                                >
                                    <Plus className="w-3 h-3" />
                                    Add Action
                                </button>
                            </div>
                        </div>

                        {/* More Options */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">
                                More options
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="stopProcessing"
                                        checked={formData.stopProcessingOnFirstSuccess}
                                        onChange={(e) =>
                                            handleInputChange("stopProcessingOnFirstSuccess", e.target.checked)
                                        }
                                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                    />
                                    <label htmlFor="stopProcessing" className="text-sm text-gray-700">
                                        Stop processing rule upon first successful action
                                    </label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="runOnActivation"
                                        checked={formData.runRuleOnActivation}
                                        onChange={(e) =>
                                            handleInputChange("runRuleOnActivation", e.target.checked)
                                        }
                                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                    />
                                    <label htmlFor="runOnActivation" className="text-sm text-gray-700">
                                        Run rule upon activation
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 flex-shrink-0">
                    <div className="flex justify-center gap-3">
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
                            {editRule ? 'Save Changes' : 'Save Rule'}
                            {/* <ChevronDown className="w-4 h-4" /> */}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddRoutingRuleModal;