"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical, Edit, Trash2, Eye, Settings } from "lucide-react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AddRoutingRuleModal from "./modals/AddRoutingRuleModal";
import ViewRoutingRuleModal from "./modals/ViewRoutingRuleModal";

// Routing Rule data type
interface RoutingRule {
    id: number;
    name: string;
    description: string;
    criteria: string;
    enabled: boolean;
}

// Sample data for Payment Routing Rules
const paymentRoutingData: RoutingRule[] = [
    { id: 1, name: "NIP Rule for One Bank", description: "An description of the Rule name in question f...", criteria: "OneBank && Transfer && Fidelity Bank", enabled: true },
    { id: 2, name: "Transfer Routing Rules for Sterling Pro", description: "An description of the Rule name in question f...", criteria: "Sterling Pro && Transfer && Fidelity Bank", enabled: true },
    { id: 3, name: "NIP Rule for One Bank", description: "An description of the Rule name in question f...", criteria: "OneBank && Transfer && Fidelity Bank", enabled: true },
    { id: 4, name: "Transfer Routing Rules for Sterling Pro", description: "An description of the Rule name in question f...", criteria: "Sterling Pro && Transfer && Fidelity Bank", enabled: true },
];

// Interface for modal form data
interface RoutingRuleFormData {
    ruleName: string;
    ruleDescription: string;
    conditions: { id: string; type: string; }[];
    actions: { id: string; type: string; }[];
    stopProcessingOnFirstSuccess: boolean;
    runRuleOnActivation: boolean;
}

// Props interface
interface PaymentRoutingRulesProps {
    isAddModalOpen?: boolean;
    setIsAddModalOpen?: (open: boolean) => void;
}

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-[#22C55E]' : 'bg-gray-200'
            }`}
    >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
        />
    </button>
);

// Column definitions
const columns: Column<RoutingRule>[] = [
    { key: "name", header: "Rule Name", sortable: true },
    { key: "description", header: "Rule Description" },
    { key: "criteria", header: "Criteria" },
    {
        key: "enabled",
        header: "",
        render: (item) => (
            <div className="flex items-center gap-2">
                <Toggle checked={item.enabled} onChange={() => { }} />
                {/* <button className="p-1 hover:bg-gray-100 ml-2 rounded">
                    <Image src="/dashboard/search.svg" alt="More" width={20} height={20} />
                </button> */}
            </div>
        )
    },
];

// Filter definitions
const filters: Filter[] = [
    {
        key: "ruleAppliesTo",
        label: "All Channels",
        options: [
            { label: "NIP", value: "NIP" },
            { label: "NEFT", value: "NEFT" },
            { label: "RTGS", value: "RTGS" },
        ],
    },
    {
        key: "provider",
        label: "All Providers",
        options: [
            { label: "OneBank", value: "OneBank" },
            { label: "Sterling Pro", value: "Sterling Pro" },
            { label: "Fidelity Bank", value: "Fidelity Bank" },
        ],
    },
    {
        key: "transactionType",
        label: "All Transaction Types",
        options: [
            { label: "Transfer", value: "Transfer" },
            { label: "Payment", value: "Payment" },
        ],
    },
];

const PaymentRoutingRules: React.FC<PaymentRoutingRulesProps> = ({
    isAddModalOpen = false,
    setIsAddModalOpen
}) => {
    const [routingRules, setRoutingRules] = useState(paymentRoutingData);
    const [internalModalOpen, setInternalModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<RoutingRule | null>(null);
    const [editRule, setEditRule] = useState<RoutingRule | null>(null);

    // Use external modal state if provided, otherwise use internal state
    const modalOpen = setIsAddModalOpen ? (isAddModalOpen || !!editRule) : (internalModalOpen || !!editRule);
    const setModalOpen = (open: boolean) => {
        if (setIsAddModalOpen) {
            setIsAddModalOpen(open);
        } else {
            setInternalModalOpen(open);
        }
        if (!open) {
            setEditRule(null);
        }
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleEdit = (item: RoutingRule) => {
        setEditRule(item);
        setModalOpen(true);
    };

    const handleDelete = (item: RoutingRule) => {
        console.log("Deleting rule:", item);
        // Add your delete logic here
    };

    const handleView = (item: RoutingRule) => {
        setSelectedRule(item);
        setViewModalOpen(true);
    };

    const handleSettings = (item: RoutingRule) => {
        console.log("Opening settings for rule:", item);
        // Add your settings logic here
    };

    const handleSaveRoutingRule = (data: RoutingRuleFormData) => {
        // Create new routing rule from form data
        const newRule: RoutingRule = {
            id: routingRules.length + 1,
            name: data.ruleName,
            description: data.ruleDescription,
            criteria: `${data.conditions.map(c => c.type).join(" && ")} → ${data.actions.map(a => a.type).join(" && ")}`,
            enabled: true,
        };

        setRoutingRules(prev => [...prev, newRule]);
        console.log("New routing rule created:", newRule);
    };

    return (
        <>
            <DataTable
                data={routingRules}
                columns={columns}
                filters={filters}
                searchPlaceholder="Find or search for rules"
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
                rowActions={(item) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleView(item)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Rule
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={() => handleSettings(item)}>
                                <Settings className="w-4 h-4 mr-2" />
                                Rule Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator /> */}
                            {/* <DropdownMenuItem
                                onClick={() => handleDelete(item)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Rule
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                pageSize={10}
            />

            <AddRoutingRuleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveRoutingRule}
                ruleType="payment"
                editRule={editRule}
            />

            <ViewRoutingRuleModal
                isOpen={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false);
                    setSelectedRule(null);
                }}
                rule={selectedRule}
                ruleType="payment"
                onEdit={(rule) => {
                    setViewModalOpen(false);
                    setSelectedRule(null);
                    handleEdit(rule);
                }}
                onDelete={(rule) => {
                    setViewModalOpen(false);
                    setSelectedRule(null);
                    handleDelete(rule);
                }}
                onDeactivate={(rule) => {
                    setViewModalOpen(false);
                    setSelectedRule(null);
                    console.log("Deactivating rule:", rule);
                }}
            />
        </>
    );
};

export default PaymentRoutingRules;
