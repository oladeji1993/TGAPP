"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, MoreVertical } from "lucide-react";

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

const UserManagementPage = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add New User</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="inline-flex items-center bg-[#F5F5F5] rounded-full p-1">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                        activeTab === 'users'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    All Users
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                        activeTab === 'roles'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    Roles & Permissions
                </button>
            </div>

            {/* Table */}
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
        </div>
    );
};

export default UserManagementPage;
