"use client";

import React from "react";
import { X } from "lucide-react";

interface DeactivateModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any | null;
    onConfirm: () => void;
    itemType?: string;
    title?: string;
    description?: string;
}

const DeactivateBankModal: React.FC<DeactivateModalProps> = ({
    isOpen,
    onClose,
    item,
    onConfirm,
    itemType = "item",
    title,
    description
}) => {
    if (!isOpen || !item) {
        return null;
    }

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const modalTitle = title || `Deactivate ${itemType}?`;
    const modalDescription = description || `Are you sure you want to deactivate this ${itemType.toLowerCase()}?`;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[9999] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {modalTitle}
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
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            {modalDescription}
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

export default DeactivateBankModal;
