"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Search } from "lucide-react";
import Image from "next/image";
import AuditLogDetailsModal from "./AuditLogDetailsModal";

// Audit log data type
interface AuditLog {
    id: number;
    performedOn: string;
    performedBy: string;
    actionType: string;
    description: string;
    module: string;
    status: string;
}

// Sample data
const auditLogsData: AuditLog[] = [
    { id: 1, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 2, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
    { id: 3, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Create", description: "Create NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 4, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Login", description: "12/12/2025 - 12:00PM", module: "Login", status: "Completed" },
    { id: 5, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 6, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
    { id: 7, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Create", description: "Create NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 8, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Login", description: "12/12/2025 - 12:00PM", module: "Login", status: "Completed" },
    { id: 9, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 10, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
    { id: 11, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Create", description: "Create NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
    { id: 12, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Login", description: "12/12/2025 - 12:00PM", module: "Login", status: "Completed" },
];

// Column definitions
const columns: Column<AuditLog>[] = [
    { key: "performedOn", header: "Performed On" },
    { key: "performedBy", header: "Performed by" },
    { key: "actionType", header: "Action Type" },
    { key: "description", header: "Description" },
    {
        key: "module",
        header: "Module",
        sortable: true,
    },
    { key: "status", header: "Status" },
];

// Filter definitions
const filters: Filter[] = [
    {
        key: "actionType",
        label: "All Action Types",
        options: [
            { label: "Create", value: "Create" },
            { label: "Update", value: "Update" },
            { label: "Delete", value: "Delete" },
            { label: "Login", value: "Login" },
        ],
    },
    {
        key: "module",
        label: "All Modules",
        options: [
            { label: "Providers", value: "Providers" },
            { label: "User Management", value: "User Management" },
            { label: "Login", value: "Login" },
        ],
    },
];

const AuditLogsPage = () => {
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const handleRefresh = () => {
        console.log("Refreshing data...");
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewDetails = (item: AuditLog) => {
        setSelectedLog(item);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>

            {/* Table */}
            <DataTable
                data={auditLogsData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search logs"
                onRefresh={handleRefresh}
                onExport={handleExport}
                rowActions={(item) => (
                    <button
                        className="p-1 hover:bg-gray-100 ml-2 rounded"
                        onClick={() => handleViewDetails(item)}
                    >
                        <Image src="/dashboard/search.svg" alt="View Details" width={20} height={20} />
                    </button>
                )}
                pageSize={10}
            />

            <AuditLogDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedLog(null);
                }}
                auditLog={selectedLog}
            />
        </div>
    );
};

export default AuditLogsPage;
