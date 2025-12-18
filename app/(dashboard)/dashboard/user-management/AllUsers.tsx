"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical } from "lucide-react";

// User data type
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdBy: string;
    createdOn: string;
    status: string;
}

// Sample data
const usersData: User[] = [
    { id: 1, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 2, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 3, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Operations", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 4, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Reconciliation", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 5, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 6, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 7, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 8, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 9, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 10, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 11, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 12, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 13, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 14, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 15, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Admin", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
    { id: 16, name: "Richard Damola", email: "richard.damola@sterling.ng", role: "Read-Only", createdBy: "Davis Uche", createdOn: "12/12/2025 - 12:00PM", status: "Active" },
];

// Column definitions
const columns: Column<User>[] = [
    { key: "name", header: "User Name" },
    { key: "email", header: "User Email" },
    { key: "role", header: "Role", sortable: true },
    { key: "createdBy", header: "Created By" },
    { key: "createdOn", header: "Created On" },
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
        key: "role",
        label: "All Roles",
        options: [
            { label: "Admin", value: "Admin" },
            { label: "Read-Only", value: "Read-Only" },
            { label: "Operations", value: "Operations" },
            { label: "Reconciliation", value: "Reconciliation" },
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

const AllUsers = () => {
    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <DataTable
            data={usersData}
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

export default AllUsers;
