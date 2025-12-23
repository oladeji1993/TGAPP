"use client";

import React from "react";
import { X } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdBy: string;
    createdOn: string;
    status: string;
}

interface DeactivateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onConfirm: (user: User) => void;
}

const DeactivateUserModal: React.FC<DeactivateUserModalProps> = ({
    isOpen,
    onClose,
    user,
    onConfirm
}) => {
    if (!isOpen || !user) {
        return null;
    }

    const handleConfirm = () => {
        onConfirm(user);
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
                            Deactivate User?
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
                        {/* User Name */}
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </h3>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            Are you sure you want to deactivate this user?
                        </p>

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

export default DeactivateUserModal;