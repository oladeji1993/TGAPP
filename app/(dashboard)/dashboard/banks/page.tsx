"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, MoreVertical } from "lucide-react";

// Bank data type
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

// Sample data
const banksData: Bank[] = [
    { id: 1, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 2, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 3, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", defaultProvider: "NEFT", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 4, code: "012345678", name: "Paystack-Titan", type: "Fintech", defaultProvider: "RTGS", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 5, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 6, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 7, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", defaultProvider: "NEFT", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 8, code: "012345678", name: "Paystack-Titan", type: "Fintech", defaultProvider: "RTGS", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 9, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 10, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 11, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 12, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
];

// Column definitions
const columns: Column<Bank>[] = [
    { key: "code", header: "Bank Code" },
    { key: "name", header: "Bank Name", sortable: true },
    { key: "type", header: "Bank Type", sortable: true },
    { key: "defaultProvider", header: "Default Provi..." },
    { key: "supportEmail", header: "Support Email" },
    { key: "fraudEmail", header: "Fraud Desk Email" },
    { 
        key: "status", 
        header: "Status",
        render: (item) => (
            <span className="text-[#27920B] text-sm font-medium">
                {item.status}
            </span>
        )
    },
];

// Filter definitions
const filters: Filter[] = [
    {
        key: "type",
        label: "All Bank Types",
        options: [
            { label: "Conventional", value: "Conventional" },
            { label: "Non-Interest", value: "Non-Interest" },
            { label: "Microfinance", value: "Microfinance" },
            { label: "Fintech", value: "Fintech" },
        ],
    },
    {
        key: "defaultProvider",
        label: "Default Provider",
        options: [
            { label: "NIP", value: "NIP" },
            { label: "Interswitch", value: "Interswitch" },
            { label: "NEFT", value: "NEFT" },
            { label: "RTGS", value: "RTGS" },
        ],
    },
    {
        key: "status",
        label: "All Statuses",
        options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
        ],
    },
];

const BanksPage = () => {
    const handleRefresh = () => {
        console.log("Refreshing data...");
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Banks Configuration</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add New Bank</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <DataTable
                data={banksData}
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

export default BanksPage;
