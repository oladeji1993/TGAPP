"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical, Search } from "lucide-react";
import Image from "next/image";

// Routing Rule data type
interface RoutingRule {
    id: number;
    name: string;
    description: string;
    criteria: string;
    enabled: boolean;
}

// Sample data for VAS Routing Rules
const vasRoutingData: RoutingRule[] = [
    { id: 1, name: "Airtime Rule for Onebank", description: "An description of the Rule name in question f...", criteria: "OneBank && Airtime", enabled: true },
    { id: 2, name: "Transfer Routing Rules for Sterling Pro", description: "An description of the Rule name in question f...", criteria: "Sterling Pro && Airtime", enabled: true },
    { id: 3, name: "Airtime Rule for Onebank", description: "An description of the Rule name in question f...", criteria: "OneBank && Airtime", enabled: true },
    { id: 4, name: "Transfer Routing Rules for Sterling Pro", description: "An description of the Rule name in question f...", criteria: "Sterling Pro && Airtime", enabled: true },
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
            { label: "Airtime", value: "Airtime" },
            { label: "Data", value: "Data" },
            { label: "Bills", value: "Bills" },
        ],
    },
    {
        key: "provider",
        label: "All Providers",
        options: [
            { label: "OneBank", value: "OneBank" },
            { label: "Sterling Pro", value: "Sterling Pro" },
        ],
    },
    {
        key: "transactionType",
        label: "All Transaction Types",
        options: [
            { label: "Airtime", value: "Airtime" },
            { label: "Data", value: "Data" },
        ],
    },
];

const VASRoutingRules = () => {
    const handleExport = () => {
        console.log("Exporting VAS data...");
    };

    return (
        <DataTable
            data={vasRoutingData}
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

export default VASRoutingRules;
