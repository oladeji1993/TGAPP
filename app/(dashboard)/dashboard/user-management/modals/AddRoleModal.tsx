"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Role {
    id?: number;
    role: string;
    createdBy?: string;
    lastModifiedBy?: string;
    lastModifiedOn?: string;
    noOfUsers?: number;
    accessModules?: number;
    status?: string;
    description?: string;
}

interface ModulePermission {
    module: string;
    accessLevel: string;
}

interface AddRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddRole?: (roleData: { name: string; description: string; permissions: ModulePermission[] }) => void;
    editRole?: Role | null;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
    isOpen,
    onClose,
    onAddRole,
    editRole,
}) => {
    const [roleName, setRoleName] = useState(editRole?.role || "");
    const [roleDescription, setRoleDescription] = useState(editRole?.description || "");
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    // Available access levels
    const accessLevels = ["No Access", "View", "View, Download", "View, Download, Edit"];

    // System modules
    const modules = [
        "Dashboard",
        "Trans. Status",
        "Banks",
        "Providers",
        "Bill Categories",
        "Routing Rules",
        "Channels",
        "Audit Logs",
        "User Management"
    ];

    const [permissions, setPermissions] = useState<{ [key: string]: string }>(() => {
        const initialPermissions: { [key: string]: string } = {};
        modules.forEach(module => {
            // Set default permissions based on edit mode
            if (editRole) {
                // For edit mode, set appropriate permissions based on role
                if (module === "Dashboard") {
                    initialPermissions[module] = "View";
                } else {
                    initialPermissions[module] = editRole.role === "Admin" ? "View, Download, Edit" : "View, Download, Edit";
                }
            } else {
                initialPermissions[module] = "No Access";
            }
        });
        return initialPermissions;
    });

    // Update form fields when editRole changes
    useEffect(() => {
        if (editRole) {
            setRoleName(editRole.role);
            // Set appropriate description based on role
            const description = editRole.role === "Admin"
                ? "For administrative tasks that require a high level of visibility and control."
                : `For ${editRole.role.toLowerCase()} tasks and operations within the system.`;
            setRoleDescription(description);

            // Update permissions for edit mode
            const editPermissions: { [key: string]: string } = {};
            modules.forEach(module => {
                if (module === "Dashboard") {
                    editPermissions[module] = "View";
                } else {
                    editPermissions[module] = "View, Download, Edit";
                }
            });
            setPermissions(editPermissions);
        } else {
            setRoleName("");
            setRoleDescription("");
            const resetPermissions: { [key: string]: string } = {};
            modules.forEach(module => {
                resetPermissions[module] = "No Access";
            });
            setPermissions(resetPermissions);
        }
    }, [editRole]);

    const toggleDropdown = (module: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [module]: !prev[module]
        }));
    };

    const setPermission = (module: string, accessLevel: string) => {
        setPermissions(prev => ({
            ...prev,
            [module]: accessLevel
        }));
        setOpenDropdowns(prev => ({
            ...prev,
            [module]: false
        }));
    };

    const handleCancel = () => {
        setRoleName("");
        setRoleDescription("");
        setPermissions(() => {
            const resetPermissions: { [key: string]: string } = {};
            modules.forEach(module => {
                resetPermissions[module] = "No Access";
            });
            return resetPermissions;
        });
        onClose();
    };

    const handleSaveRole = () => {
        if (roleName.trim()) {
            const rolePermissions: ModulePermission[] = modules.map(module => ({
                module,
                accessLevel: permissions[module]
            }));

            onAddRole?.({
                name: roleName,
                description: roleDescription,
                permissions: rolePermissions
            });

            // Reset form
            setRoleName("");
            setRoleDescription("");
            setPermissions(() => {
                const resetPermissions: { [key: string]: string } = {};
                modules.forEach(module => {
                    resetPermissions[module] = "No Access";
                });
                return resetPermissions;
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    const isEditMode = !!editRole;

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
                                {isEditMode ? 'Edit User Role' : 'Add New User Role'}
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
                        {/* Role Details Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role details</h3>

                            {/* Role Name Field */}
                            <div className="space-y-2 mb-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    placeholder="Enter name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                            </div>

                            {/* Role Description Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Role Description
                                </label>
                                <textarea
                                    value={roleDescription}
                                    onChange={(e) => setRoleDescription(e.target.value)}
                                    placeholder="Enter description"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                                />
                            </div>
                        </div>

                        {/* Access & Permissions Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Access & Permissions</h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="text-sm font-medium text-gray-700">Module</div>
                                <div className="text-sm font-medium text-gray-700">Access Level</div>
                            </div>

                            <div className="space-y-3">
                                {modules.map((module) => (
                                    <div key={module} className="grid grid-cols-2 gap-4 items-center">
                                        {/* Module Name */}
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                value={module}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700"
                                            />
                                        </div>

                                        {/* Access Level Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(module)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left bg-white flex items-center justify-between"
                                            >
                                                <span className={permissions[module] === "No Access" ? "text-gray-500" : "text-gray-900"}>
                                                    {permissions[module]}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openDropdowns[module] ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openDropdowns[module] && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                                    {accessLevels.map((level) => (
                                                        <button
                                                            key={level}
                                                            onClick={() => setPermission(module, level)}
                                                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                                                        >
                                                            <span>{level}</span>
                                                            {permissions[module] === level && (
                                                                <Check className="w-4 h-4 text-blue-600" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                            onClick={handleSaveRole}
                            disabled={!roleName.trim()}
                            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isEditMode ? 'Update Role' : 'Save New Role'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {Object.values(openDropdowns).some(open => open) && (
                <div
                    onClick={() => setOpenDropdowns({})}
                    className="fixed inset-0 z-40"
                />
            )}
        </>
    );
};

export default AddRoleModal;