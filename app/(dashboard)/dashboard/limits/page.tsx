"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Search } from "lucide-react";

// Limit data type
interface Limit {
    id: number;
    name: string;
    channel: string;
    minAmount: string;
    maxAmount: string;
    dailyLimit: string;
    status: string;
}

// Sample data
const limitsData: Limit[] = [
    { id: 1, name: "NIP Transfer Limit", channel: "NIP", minAmount: "₦100", maxAmount: "₦5,000,000", dailyLimit: "₦10,000,000", status: "Active" },
    { id: 2, name: "NEFT Transfer Limit", channel: "NEFT", minAmount: "₦1,000", maxAmount: "₦10,000,000", dailyLimit: "₦50,000,000", status: "Active" },
    { id: 3, name: "Internal Transfer Limit", channel: "Internal", minAmount: "₦100", maxAmount: "₦50,000,000", dailyLimit: "₦100,000,000", status: "Active" },
    { id: 4, name: "Card Payment Limit", channel: "Card", minAmount: "₦100", maxAmount: "₦1,000,000", dailyLimit: "₦5,000,000", status: "Inactive" },
    { id: 5, name: "USSD Transfer Limit", channel: "USSD", minAmount: "₦100", maxAmount: "₦100,000", dailyLimit: "₦500,000", status: "Active" },
];

// Column definitions
const columns: Column<Limit>[] = [
    { key: "name", header: "Limit Name" },
    { key: "channel", header: "Channel" },
    { key: "minAmount", header: "Min Amount" },
    { key: "maxAmount", header: "Max Amount" },
    { key: "dailyLimit", header: "Daily Limit" },
    { 
        key: "status", 
        header: "Status",
        render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"
            }`}>
                {item.status}
            </span>
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
            { label: "Internal", value: "Internal" },
            { label: "Card", value: "Card" },
            { label: "USSD", value: "USSD" },
        ],
    },
    {
        key: "status",
        label: "All Status",
        options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
        ],
    },
];

const LimitsPage = () => {
    const handleRefresh = () => {
        console.log("Refreshing data...");
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900">Limits</h1>

            {/* Table */}
            <DataTable
                data={limitsData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search limits"
                onRefresh={handleRefresh}
                onExport={handleExport}
                showDateFilter={false}
                rowActions={(item) => (
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Search className="w-4 h-4 text-gray-500" />
                    </button>
                )}
                pageSize={10}
            />
        </div>
    );
};

export default LimitsPage;
