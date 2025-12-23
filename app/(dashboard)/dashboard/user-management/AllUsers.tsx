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
import ViewUserModal from "./modals/ViewUserModal";
import AddUserModal from "./modals/AddUserModal";
import DeactivateUserModal from "./modals/DeactivateUserModal";

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

interface AllUsersProps {
    isAddModalOpen?: boolean;
    onCloseAddModal?: () => void;
}

const AllUsers: React.FC<AllUsersProps> = ({
    isAddModalOpen = false,
    onCloseAddModal
}) => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeactivateUser = (user: User) => {
        setDeactivatingUser(user);
        setIsDeactivateModalOpen(true);
    };

    const handleRemoveUser = (user: User) => {
        console.log("Removing user:", user);
        // Add your remove user logic here
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedUser(null);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

    const closeDeactivateModal = () => {
        setIsDeactivateModalOpen(false);
        setDeactivatingUser(null);
    };

    const confirmDeactivateUser = (user: User) => {
        console.log("Deactivating user:", user);
        // Add your actual deactivate user logic here
        // You would typically make an API call here
        closeDeactivateModal();
    };

    const handleAddUser = (userData: { email: string; role: string }) => {
        console.log("Adding new user:", userData);
        // Add logic to create new user
        // You would typically make an API call here
    };

    const handleUpdateUser = (userData: { email: string; role: string }) => {
        console.log("Updating user:", editingUser?.id, "with data:", userData);
        // Add logic to update existing user
        // You would typically make an API call here
        closeEditModal();
    };

    return (
        <>
            <DataTable
                data={usersData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search user name,..."
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
                                onClick={() => handleViewUser(item)}
                                className="cursor-pointer"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View User Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleEditUser(item)}
                                className="cursor-pointer"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeactivateUser(item)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                pageSize={10}
            />

            {/* View User Modal */}
            <ViewUserModal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                user={selectedUser}
                onEdit={handleEditUser}
                onDeactivate={handleDeactivateUser}
                onRemove={handleRemoveUser}
            />

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={onCloseAddModal || (() => { })}
                onAddUser={handleAddUser}
            />

            {/* Edit User Modal */}
            <AddUserModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onAddUser={handleUpdateUser}
                editUser={editingUser}
            />

            {/* Deactivate User Modal */}
            <DeactivateUserModal
                isOpen={isDeactivateModalOpen}
                onClose={closeDeactivateModal}
                user={deactivatingUser}
                onConfirm={confirmDeactivateUser}
            />
        </>
    );
};

export default AllUsers;
