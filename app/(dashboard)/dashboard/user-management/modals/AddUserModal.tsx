"use client";

import React, { useState } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface User {
    id?: number;
    name?: string;
    email: string;
    role: string;
    createdBy?: string;
    createdOn?: string;
    status?: string;
}

interface Permission {
    module: string;
    permissions: string;
}

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUser?: (userData: { email: string; role: string }) => void;
    editUser?: User | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isOpen,
    onClose,
    onAddUser,
    editUser,
}) => {
    const [userEmail, setUserEmail] = useState(editUser?.email || "");
    const [selectedRole, setSelectedRole] = useState(editUser?.role || "");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    // Available roles
    const roles = ["Admin", "Operations", "Reconciliation", "Compliance", "Audit", "Read-Only"];

    // Permissions based on role
    const getPermissions = (role: string): Permission[] => {
        const basePermissions = [
            { module: "Dashboard", permissions: "View" },
            { module: "Transaction Status", permissions: "View, Download, Edit" },
            { module: "Banks", permissions: "View, Download, Edit" },
            { module: "Providers", permissions: "View, Download, Edit" },
            { module: "Routing Rules", permissions: "View, Download, Edit" },
            { module: "Channels", permissions: "View, Download, Edit" },
            { module: "Audit Logs", permissions: "View, Download, Edit" },
            { module: "User Management", permissions: "View, Download, Edit" },
        ];

        if (role === "Read-Only") {
            return basePermissions.map(p => ({ ...p, permissions: "View" }));
        }

        return basePermissions;
    };

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
        setIsRoleDropdownOpen(false);
    };

    const handleCancel = () => {
        setUserEmail("");
        setSelectedRole("");
        onClose();
    };

    const handleAddUser = () => {
        if (userEmail && selectedRole) {
            onAddUser?.({ email: userEmail, role: selectedRole });
            setUserEmail("");
            setSelectedRole("");
            onClose();
        }
    };

    if (!isOpen) return null;

    const permissions = selectedRole ? getPermissions(selectedRole) : [];
    const isEditMode = !!editUser;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 w-screen h-screen bg-black/30 z-9999 transition-all duration-300 ease-out"
            />

            {/* Side Modal */}
            <div
                className={`fixed top-0 h-full bg-white z-10000 shadow-2xl transition-all duration-300 ease-out 
                    ${isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    right-0 w-full sm:w-[532px] max-w-full flex flex-col`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                {isEditMode ? 'Edit User' : 'Add New User'}
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* New User Details Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">New User Details</h3>

                            {/* User Email Field */}
                            <div className="space-y-2 mb-4">
                                <label className="text-sm font-medium text-gray-700">
                                    User Email
                                </label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Enter here"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                            </div>

                            {/* User Role Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    User Role
                                </label>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left bg-white flex items-center justify-between"
                                    >
                                        <span className={selectedRole ? "text-gray-900" : "text-gray-500"}>
                                            {selectedRole || "Select here"}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isRoleDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                            {roles.map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => handleRoleSelect(role)}
                                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                                                >
                                                    <span>{role}</span>
                                                    {selectedRole === role && (
                                                        <Check className="w-4 h-4 text-blue-600" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Role & Permission Details Section */}
                        {selectedRole && (
                            <div className="bg-white">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role & Permission Details</h3>
                                <div className="space-y-3">
                                    {permissions.map((permission, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-b-0">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">{permission.module}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-gray-900">{permission.permissions}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 sm:px-6 py-4 border-t border-gray-200 shrink-0">
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddUser}
                            disabled={!userEmail || !selectedRole}
                            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isEditMode ? 'Update User' : 'Add User'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isRoleDropdownOpen && (
                <div
                    onClick={() => setIsRoleDropdownOpen(false)}
                    className="fixed inset-0 z-40"
                />
            )}
        </>
    );
};

export default AddUserModal;