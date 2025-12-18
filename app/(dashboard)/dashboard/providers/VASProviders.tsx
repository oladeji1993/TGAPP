"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical } from "lucide-react";

// VAS Provider data type
interface VASProvider {
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

// Sample VAS data
const vasProvidersData: VASProvider[] = [
    { id: 1, name: "Quickteller", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 2, name: "Credit Switch", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
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

// Column definitions for VAS
const columns: Column<VASProvider>[] = [
    { key: "name", header: "Provider Name", sortable: true },
    { key: "code", header: "Provider Code" },
    { key: "banksSupported", header: "Banks Supported" },
    { key: "channelsSupported", header: "Channels Supported" },
    { key: "isDefault", header: "Default..." },
    { key: "successRate", header: "% Success" },
    { key: "avgResponse", header: "Avg. Res..." },
    { 
        key: "status", 
        header: "Status",
        render: (item) => (
            <span className={`text-sm font-medium ${
                item.status === "Active" ? "text-[#27920B]" : "text-red-500"
            }`}>
                {item.status}
            </span>
        )
    },
    {
        key: "enabled",
        header: "",
        render: (item) => (
            <Toggle checked={item.enabled} onChange={() => {}} />
        )
    },
];

// Filter definitions for VAS
const filters: Filter[] = [
    {
        key: "channel",
        label: "All Channels",
        options: [
            { label: "Quickteller", value: "Quickteller" },
            { label: "Credit Switch", value: "Credit Switch" },
        ],
    },
    {
        key: "status",
        label: "All Statuses",
        options: [
            { label: "Active", value: "Active" },
            { label: "Down", value: "Down" },
        ],
    },
];

const VASProviders = () => {
    const handleExport = () => {
        console.log("Exporting VAS data...");
    };

    return (
        <DataTable
            data={vasProvidersData}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search user name,..."
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

export default VASProviders;
