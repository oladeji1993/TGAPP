"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, MoreVertical } from "lucide-react";

// Provider data type
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

// Sample data
const providersData: Provider[] = [
    { id: 1, name: "NIP", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 2, name: "NEFT", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 3, name: "NPS", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 4, name: "RTGS", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 5, name: "Interswitch", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 6, name: "Interstellar", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 7, name: "E Tranzact", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 8, name: "Coral Pay", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Down", enabled: true },
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
const columns: Column<Provider>[] = [
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

// Filter definitions
const filters: Filter[] = [
    {
        key: "channel",
        label: "All Channels",
        options: [
            { label: "NIP", value: "NIP" },
            { label: "NEFT", value: "NEFT" },
            { label: "RTGS", value: "RTGS" },
        ],
    },
    {
        key: "defaultProvider",
        label: "Default Provider",
        options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
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

const ProvidersPage = () => {
    const [activeTab, setActiveTab] = useState<'payment' | 'vas'>('payment');

    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Providers Configuration</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                    <span>New Payment Provider</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="inline-flex items-center bg-[#F5F5F5] rounded-full p-1">
                <button
                    onClick={() => setActiveTab('payment')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                        activeTab === 'payment'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    Payment Providers
                </button>
                <button
                    onClick={() => setActiveTab('vas')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                        activeTab === 'vas'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    VAS Providers
                </button>
            </div>

            {/* Table */}
            <DataTable
                data={providersData}
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
        </div>
    );
};

export default ProvidersPage;
