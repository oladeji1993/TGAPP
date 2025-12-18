"use client";

import React from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical } from "lucide-react";

// Role data type
interface Role {
    id: number;
    role: string;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedOn: string;
    noOfUsers: number;
    accessModules: number;
    status: string;
}

// Sample data
const rolesData: Role[] = [
    { id: 1, role: "Admin", createdBy: "SYSTEM", lastModifiedBy: "Firstname Lastname", lastModifiedOn: "12/12/2025 - 12:00PM", noOfUsers: 4, accessModules: 4, status: "Active" },
    { id: 2, role: "Operations", createdBy: "SYSTEM", lastModifiedBy: "Firstname Lastname", lastModifiedOn: "12/12/2025 - 12:00PM", noOfUsers: 12, accessModules: 4, status: "Active" },
    { id: 3, role: "Reconciliation", createdBy: "SYSTEM", lastModifiedBy: "Firstname Lastname", lastModifiedOn: "12/12/2025 - 12:00PM", noOfUsers: 4, accessModules: 4, status: "Active" },
    { id: 4, role: "Compliance", createdBy: "SYSTEM", lastModifiedBy: "Firstname Lastname", lastModifiedOn: "12/12/2025 - 12:00PM", noOfUsers: 12, accessModules: 4, status: "Active" },
    { id: 5, role: "Audit", createdBy: "SYSTEM", lastModifiedBy: "Firstname Lastname", lastModifiedOn: "12/12/2025 - 12:00PM", noOfUsers: 4, accessModules: 4, status: "Active" },
];

// Column definitions
const columns: Column<Role>[] = [
    { key: "role", header: "Role" },
    { key: "createdBy", header: "Created By", sortable: true },
    { key: "lastModifiedBy", header: "Last Modified By" },
    { key: "lastModifiedOn", header: "Last Modified On" },
    { key: "noOfUsers", header: "No. of Users" },
    { key: "accessModules", header: "Access Mo..." },
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
        key: "status",
        label: "All Statuses",
        options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
        ],
    },
];

const RolesPermissions = () => {
    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <DataTable
            data={rolesData}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search"
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

export default RolesPermissions;
