"use client";

import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Bank {
    id: number;
    code: string;
    name: string;
    type: string;
    defaultProvider: string;
    supportEmail: string;
    fraudEmail: string;
    status: string;
}

interface DeactivateBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    bank: Bank | null;
    onConfirm: () => void;
}

const DeactivateBankModal: React.FC<DeactivateBankModalProps> = ({
    isOpen,
    onClose,
    bank,
    onConfirm
}) => {
    if (!isOpen || !bank) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const modalContent = (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                style={{ zIndex: 99999 }}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Deactivate Transfers to Bank?
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
                        {/* <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">
                                Admin
                            </span>
                        </div> */}

                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            Are you sure you want to deactivate Transfers to this bank?
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

    return typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null;
};

export default DeactivateBankModal;
