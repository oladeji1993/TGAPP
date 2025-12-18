"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, MoreVertical, Eye, Edit, UserX } from "lucide-react";
import AddBankModal from "@/app/(dashboard)/dashboard/banks/modals/AddBankModal";
import ViewBankModal from "@/app/(dashboard)/dashboard/banks/modals/ViewBankModal";
import DeactivateBankModal from "@/components/modals/DeactivateBankModal";

// Bank data type
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

// Sample data
const banksData: Bank[] = [
    { id: 1, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 2, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 3, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", defaultProvider: "NEFT", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 4, code: "012345678", name: "Paystack-Titan", type: "Fintech", defaultProvider: "RTGS", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 5, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 6, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 7, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", defaultProvider: "NEFT", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 8, code: "012345678", name: "Paystack-Titan", type: "Fintech", defaultProvider: "RTGS", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 9, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 10, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 11, code: "012345678", name: "Sterling Bank", type: "Conventional", defaultProvider: "NIP", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
    { id: 12, code: "012345678", name: "Jaiz Bank", type: "Non-Interest", defaultProvider: "Interswitch", supportEmail: "support_bank@mail.com", fraudEmail: "fraud_desk@mail.com", status: "Active" },
];

// Column definitions
const columns: Column<Bank>[] = [
    { key: "code", header: "Bank Code" },
    { key: "name", header: "Bank Name", sortable: true },
    { key: "type", header: "Bank Type", sortable: true },
    { key: "defaultProvider", header: "Default Provi..." },
    { key: "supportEmail", header: "Support Email" },
    { key: "fraudEmail", header: "Fraud Desk Email" },
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
        key: "type",
        label: "All Bank Types",
        options: [
            { label: "Conventional", value: "Conventional" },
            { label: "Non-Interest", value: "Non-Interest" },
            { label: "Microfinance", value: "Microfinance" },
            { label: "Fintech", value: "Fintech" },
        ],
    },
    {
        key: "defaultProvider",
        label: "Default Provider",
        options: [
            { label: "NIP", value: "NIP" },
            { label: "Interswitch", value: "Interswitch" },
            { label: "NEFT", value: "NEFT" },
            { label: "RTGS", value: "RTGS" },
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

const BanksPage = () => {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
    const [isViewBankModalOpen, setIsViewBankModalOpen] = useState(false);
    const [isDeactivateBankModalOpen, setIsDeactivateBankModalOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

    const handleRefresh = () => {
        console.log("Refreshing data...");
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewBank = (bank: Bank) => {
        setSelectedBank(bank);
        setIsViewBankModalOpen(true);
        setOpenDropdown(null);
    };

    const handleEditBank = (bank: Bank) => {
        setSelectedBank(bank);
        setModalMode('edit');
        setIsAddBankModalOpen(true);
        setOpenDropdown(null);
    };

    const handleAddBank = () => {
        setSelectedBank(null);
        setModalMode('add');
        setIsAddBankModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddBankModalOpen(false);
        setSelectedBank(null);
        setModalMode('add');
    };

    const handleCloseViewModal = () => {
        setIsViewBankModalOpen(false);
        setSelectedBank(null);
    };

    const handleEditFromView = (bank: Bank) => {
        setSelectedBank(bank);
        setModalMode('edit');
        setIsViewBankModalOpen(false);
        setIsAddBankModalOpen(true);
    };

    const handleDeactivateBank = (bank: Bank) => {
        setSelectedBank(bank);
        setIsDeactivateBankModalOpen(true);
        setOpenDropdown(null);
    };

    const handleConfirmDeactivate = () => {
        console.log("Deactivating bank:", selectedBank);
        // Here you would make the API call to deactivate the bank
        // Update the bank status to "Inactive" in your data
    };

    const handleCloseDeactivateModal = () => {
        setIsDeactivateBankModalOpen(false);
        setSelectedBank(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Banks Configuration</h1>
                <button
                    onClick={handleAddBank}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <span>Add New Bank</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <DataTable
                data={banksData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search user name,..."
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
                rowActions={(item) => (
                    <div className="relative">
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>

                        {openDropdown === item.id && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setOpenDropdown(null)}
                                />
                                <div className="absolute right-0 top-8 z-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                                    <button
                                        onClick={() => handleViewBank(item)}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Bank Details
                                    </button>
                                    <button
                                        onClick={() => handleEditBank(item)}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit Bank Details
                                    </button>
                                    <button
                                        onClick={() => handleDeactivateBank(item)}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <UserX className="w-4 h-4" />
                                        Deactivate Bank
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                pageSize={10}
            />

            <AddBankModal
                isOpen={isAddBankModalOpen}
                onClose={handleCloseModal}
                bank={selectedBank}
                mode={modalMode}
            />

            <ViewBankModal
                isOpen={isViewBankModalOpen}
                onClose={handleCloseViewModal}
                bank={selectedBank}
                onEdit={handleEditFromView}
            />

            <DeactivateBankModal
                isOpen={isDeactivateBankModalOpen}
                onClose={handleCloseDeactivateModal}
                bank={selectedBank}
                onConfirm={handleConfirmDeactivate}
            />
        </div>
    );
};

export default BanksPage;
