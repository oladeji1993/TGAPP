"use client";

import React, { useState } from "react";
import { X, Edit, UserX, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Role {
    id: number;
    role: string;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedOn: string;
    noOfUsers: number;
    accessModules: number;
    status: string;
    description?: string;
}

interface Permission {
    module: string;
    permissions: string[];
}

interface ViewRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
    onEdit?: (role: Role) => void;
    onDeactivate?: (role: Role) => void;
    onRemove?: (role: Role) => void;
}

const ViewRoleModal: React.FC<ViewRoleModalProps> = ({
    isOpen,
    onClose,
    role,
    onEdit,
    onDeactivate,
    onRemove,
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'permissions'>('details');

    if (!isOpen || !role) return null;

    // Mock permissions data - in real app, this would come from the role object or API
    const permissions: Permission[] = [
        { module: "Dashboard", permissions: ["View"] },
        { module: "Transaction Status", permissions: ["View", "Download", "Edit"] },
        { module: "Banks", permissions: ["View", "Download", "Edit"] },
        { module: "Providers", permissions: ["View", "Download", "Edit"] },
        { module: "Routing Rules", permissions: ["View", "Download", "Edit"] },
        { module: "Channels", permissions: ["View", "Download", "Edit"] },
        { module: "Audit Logs", permissions: ["View", "Download", "Edit"] },
        { module: "User Management", permissions: ["View", "Download", "Edit"] },
    ];

    // Mock role description
    const roleDescription = role.role === "Admin"
        ? "For administrative tasks that require a high level of visibility and control...."
        : `For ${role.role.toLowerCase()} tasks and operations within the system.`;

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
                                Role & Permissions Details
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
                            onClick={() => onEdit?.(role)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Role Details
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDeactivate?.(role)}
                            className="flex items-center gap-2"
                        >
                            <UserX className="w-4 h-4" />
                            Deactivate Role
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onRemove?.(role)}
                            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove Role
                        </Button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Role Details
                        </button>
                        <button
                            onClick={() => setActiveTab('permissions')}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'permissions'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Permissions
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6">
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                {/* Role Details Section */}
                                <div className="bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Role details</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Role Name</span>
                                                <span className="text-sm font-medium text-gray-900">{role.role}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Role Description</span>
                                                <span className="text-sm font-medium text-gray-900">{roleDescription}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Created By</span>
                                                <span className="text-sm font-medium text-gray-900">{role.createdBy}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Last Modified By</span>
                                                <span className="text-sm font-medium text-gray-900">{role.lastModifiedBy}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Last Modified On</span>
                                                <span className="text-sm font-medium text-gray-900">{role.lastModifiedOn}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Number of Users</span>
                                                <span className="text-sm font-medium text-gray-900">{role.noOfUsers}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Access Modules</span>
                                                <span className="text-sm font-medium text-gray-900">{role.accessModules} Modules</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-600">Status</span>
                                                <span className="text-sm font-medium text-green-600">{role.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'permissions' && (
                            <div className="space-y-6">
                                {/* Permissions Section */}
                                <div className="bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Permissions</h3>
                                    <div className="space-y-3">
                                        {permissions.map((permission, index) => (
                                            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-b-0">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-600">{permission.module}</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {permission.permissions.join(", ")}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewRoleModal;