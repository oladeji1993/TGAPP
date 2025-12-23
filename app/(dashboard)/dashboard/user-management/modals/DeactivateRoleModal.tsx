"use client";

import React from "react";
import { X } from "lucide-react";

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

interface DeactivateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
    onConfirm: (role: Role) => void;
}

const DeactivateRoleModal: React.FC<DeactivateRoleModalProps> = ({
    isOpen,
    onClose,
    role,
    onConfirm
}) => {
    if (!isOpen || !role) {
        return null;
    }

    const handleConfirm = () => {
        onConfirm(role);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-9999 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-10000 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Deactivate User Role?
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6">
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                            Are you sure you want to deactivate this user?
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                            This would remove access to all users who have this role
                        </p>

                        {/* Role Name */}
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {role.role}
                            </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm transition-colors"
                            >
                                Yes, Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeactivateRoleModal;