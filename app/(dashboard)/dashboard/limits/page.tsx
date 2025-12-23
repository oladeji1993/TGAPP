"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical, Eye, Edit, UserX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LimitDetailsModal from "./modals/LimitDetailsModal";

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
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Active"
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
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedLimit, setSelectedLimit] = useState<Limit | null>(null);

    const handleRefresh = () => {
        console.log("Refreshing data...");
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewDetails = (limit: Limit) => {
        setSelectedLimit(limit);
        setIsDetailsModalOpen(true);
    };

    const handleEditLimit = (limit: Limit) => {
        console.log("Editing limit:", limit);
        // Add your edit limit logic here
    };

    const handleDeactivateLimit = (limit: Limit) => {
        console.log("Deactivating limit:", limit);
        // Add your deactivate limit logic here
    };

    const handleDeleteLimit = (limit: Limit) => {
        console.log("Deleting limit:", limit);
        // Add your delete limit logic here
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedLimit(null);
    };

    return (
        <>
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={() => handleViewDetails(item)}
                                    className="cursor-pointer"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem
                                    onClick={() => handleEditLimit(item)}
                                    className="cursor-pointer"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Limit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDeactivateLimit(item)}
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                    <UserX className="w-4 h-4 mr-2" />
                                    {item.status === "Active" ? "Deactivate" : "Activate"} Limit
                                </DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    pageSize={10}
                />
            </div>

            {/* Limit Details Modal */}
            <LimitDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                limit={selectedLimit}
                onEdit={handleEditLimit}
                onDeactivate={handleDeactivateLimit}
                onDelete={handleDeleteLimit}
            />
        </>
    );
};

export default LimitsPage;
