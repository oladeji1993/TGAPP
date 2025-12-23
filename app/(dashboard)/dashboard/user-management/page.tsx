"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AllUsers from "./AllUsers";
import RolesPermissions from "./RolesPermissions";
import AddRoleModal from "./modals/AddRoleModal";

const UserManagementPage = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

    const handleAddNewUser = () => {
        if (activeTab === 'users') {
            setIsAddUserModalOpen(true);
        } else {
            setIsAddRoleModalOpen(true);
        }
    };

    const closeAddUserModal = () => {
        setIsAddUserModalOpen(false);
    };

    const closeAddRoleModal = () => {
        setIsAddRoleModalOpen(false);
    };

    const handleAddRole = (roleData: { name: string; description: string; permissions: any[] }) => {
        console.log("Adding new role:", roleData);
        // Add logic to create new role
        // You would typically make an API call here
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                <button
                    onClick={handleAddNewUser}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <span>{activeTab === 'users' ? 'Add New User' : 'Add New User Role'}</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="inline-flex items-center bg-[#F0F0F0] rounded-lg p-1">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'users'
                        ? 'bg-[#F60E0E] text-white'
                        : 'text-gray-700'
                        }`}
                >
                    All Users
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'roles'
                        ? 'bg-[#F60E0E] text-white'
                        : 'text-gray-700'
                        }`}
                >
                    Roles & Permissions
                </button>
            </div>

            {/* Dynamic Content */}
            {activeTab === 'users' ? (
                <AllUsers
                    isAddModalOpen={isAddUserModalOpen}
                    onCloseAddModal={closeAddUserModal}
                />
            ) : (
                <RolesPermissions />
            )}

            {/* Add Role Modal */}
            <AddRoleModal
                isOpen={isAddRoleModalOpen}
                onClose={closeAddRoleModal}
                onAddRole={handleAddRole}
            />
        </div>
    );
};

export default UserManagementPage;
