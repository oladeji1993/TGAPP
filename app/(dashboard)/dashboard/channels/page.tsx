"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, Search } from "lucide-react";
import Image from "next/image";

// Channel data type
interface Channel {
    id: number;
    name: string;
    channelType: string;
    lastModified: string;
    defaultProvider: string;
    supportedPayments: string;
    status: string;
}

// Sample data
const channelsData: Channel[] = [
    { id: 1, name: "OneBank", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
    { id: 2, name: "AltBank", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
    { id: 3, name: "Sterling Pro", channelType: "Corporate", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
    { id: 4, name: "AltPro", channelType: "Corporate", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
    { id: 5, name: "Gazelle", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
    { id: 6, name: "USSD", channelType: "USSD", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
    { id: 7, name: "Banca", channelType: "Business", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
    { id: 8, name: "altinvest", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
];

// Column definitions
const columns: Column<Channel>[] = [
    { key: "name", header: "Channel Name", sortable: true },
    { key: "channelType", header: "Channel Type" },
    { key: "lastModified", header: "Last Modified on" },
    { key: "defaultProvider", header: "Default Provi..." },
    { key: "supportedPayments", header: "Supported pa...", sortable: true },
    { key: "status", header: "Status" },
];

// Filter definitions
const filters: Filter[] = [
    {
        key: "channelType",
        label: "All Channel Types",
        options: [
            { label: "Retail", value: "Retail" },
            { label: "Corporate", value: "Corporate" },
            { label: "USSD", value: "USSD" },
            { label: "Business", value: "Business" },
        ],
    },
    {
        key: "paymentType",
        label: "All Payment Types",
        options: [
            { label: "Providers", value: "Providers" },
            { label: "User Management", value: "User Management" },
        ],
    },
];

const ChannelsPage = () => {
    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Channels</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add New Channel</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <DataTable
                data={channelsData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search Channels"
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
                rowActions={(item) => (
                    <button className="p-1 hover:bg-gray-100 ml-2 rounded">
                        <Image src="/dashboard/search.svg" alt="More" width={20} height={20}/>
                    </button>
                )}
                pageSize={10}
            />
        </div>
    );
};

export default ChannelsPage;
