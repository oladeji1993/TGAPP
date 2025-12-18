"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

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

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? 'bg-[#22C55E]' : 'bg-gray-200'
        }`}
    >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                checked ? 'translate-x-5' : 'translate-x-0.5'
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
                <Toggle checked={item.enabled} onChange={() => {}} />
                <button className="p-1 hover:bg-gray-100 ml-2 rounded">
                    <Image src="/dashboard/search.svg" alt="More" width={20} height={20}/>
                </button>
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

const PaymentRoutingRules = () => {
    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <DataTable
            data={paymentRoutingData}
            columns={columns}
            filters={filters}
            searchPlaceholder="Find or search for rules"
            showDateFilter={false}
            showRefresh={false}
            onExport={handleExport}
            rowActions={(item) => (
                <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
            )}
            pageSize={10}
        />
    );
};

export default PaymentRoutingRules;
