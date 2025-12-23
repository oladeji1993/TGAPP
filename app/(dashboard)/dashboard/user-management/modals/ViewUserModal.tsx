"use client";

import React from "react";
import { X, Edit, UserX, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdBy: string;
    createdOn: string;
    status: string;
}

interface Permission {
    module: string;
    permissions: string;
}

interface ViewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onEdit?: (user: User) => void;
    onDeactivate?: (user: User) => void;
    onRemove?: (user: User) => void;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
    isOpen,
    onClose,
    user,
    onEdit,
    onDeactivate,
    onRemove,
}) => {
    if (!isOpen || !user) return null;

    // Mock permissions data - in real app, this would come from the user object or API
    const permissions: Permission[] = [
        { module: "Dashboard", permissions: "View" },
        { module: "Transaction Status", permissions: "View, Download, Edit" },
        { module: "Banks", permissions: "View, Download, Edit" },
        { module: "Providers", permissions: "View, Download, Edit" },
        { module: "Routing Rules", permissions: "View, Download, Edit" },
        { module: "Channels", permissions: "View, Download, Edit" },
        { module: "Audit Logs", permissions: "View, Download, Edit" },
        { module: "User Management", permissions: "View, Download, Edit" },
    ];

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
                                User Information
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            variant="outline"
                            onClick={() => onEdit?.(user)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit User
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDeactivate?.(user)}
                            className="flex items-center gap-2"
                        >
                            <UserX className="w-4 h-4" />
                            Deactivate User
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onRemove?.(user)}
                            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove User
                        </Button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* User Details Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">User details</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">User Name</span>
                                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">User email</span>
                                        <span className="text-sm font-medium text-gray-900">{user.email}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Created By</span>
                                        <span className="text-sm font-medium text-gray-900">{user.createdBy}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Created On</span>
                                        <span className="text-sm font-medium text-gray-900">{user.createdOn}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Role</span>
                                        <span className="text-sm font-medium text-gray-900">{user.role}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span className="text-sm font-medium text-green-600">{user.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Role & Permission Details Section */}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewUserModal;