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
import ViewRoleModal from "./modals/ViewRoleModal";
import AddRoleModal from "./modals/AddRoleModal";
import DeactivateRoleModal from "./modals/DeactivateRoleModal";

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
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [deactivatingRole, setDeactivatingRole] = useState<Role | null>(null);

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewDetails = (role: Role) => {
        setSelectedRole(role);
        setIsViewModalOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        setIsEditModalOpen(true);
    };

    const handleDeactivateRole = (role: Role) => {
        setDeactivatingRole(role);
        setIsDeactivateModalOpen(true);
    };

    const handleRemoveRole = (role: Role) => {
        console.log("Removing role:", role);
        // Add your remove role logic here
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedRole(null);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingRole(null);
    };

    const closeDeactivateModal = () => {
        setIsDeactivateModalOpen(false);
        setDeactivatingRole(null);
    };

    const confirmDeactivateRole = () => {
        console.log("Deactivating role:", deactivatingRole);
        // Add your actual deactivate role logic here
        // You would typically make an API call here
    };

    const handleUpdateRole = (roleData: { name: string; description: string; permissions: any[] }) => {
        console.log("Updating role:", editingRole?.id, "with data:", roleData);
        // Add logic to update existing role
        // You would typically make an API call here
        closeEditModal();
    };

    return (
        <>
            <DataTable
                data={rolesData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search"
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
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
                            <DropdownMenuItem
                                onClick={() => handleEditRole(item)}
                                className="cursor-pointer"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Role Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeactivateRole(item)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate Role
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                pageSize={10}
            />

            {/* View Role Modal */}
            <ViewRoleModal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                role={selectedRole}
                onEdit={handleEditRole}
                onDeactivate={handleDeactivateRole}
                onRemove={handleRemoveRole}
            />

            {/* Edit Role Modal */}
            <AddRoleModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onAddRole={handleUpdateRole}
                editRole={editingRole}
            />

            {/* Deactivate Role Modal */}
            <DeactivateRoleModal
                isOpen={isDeactivateModalOpen}
                onClose={closeDeactivateModal}
                role={deactivatingRole}
                onConfirm={confirmDeactivateRole}
            />
        </>
    );
};

export default RolesPermissions;
