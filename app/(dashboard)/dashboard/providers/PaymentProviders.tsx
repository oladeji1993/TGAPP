"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { MoreVertical, Eye, Edit, UserX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewProviderModal from "./modals/ViewProviderModal";
import AddPaymentProviderModal from "./modals/AddPaymentProviderModal";
import DeactivateBankModal from "@/components/modals/DeactivateBankModal";

// Provider data type
interface Provider {
    id: number;
    name: string;
    code: string;
    banksSupported: number;
    channelsSupported: number;
    isDefault: string;
    successRate: string;
    avgResponse: string;
    status: string;
    enabled: boolean;
}

// Sample data
const providersData: Provider[] = [
    { id: 1, name: "NIP", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 2, name: "NEFT", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 3, name: "NPS", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 4, name: "RTGS", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 5, name: "Interswitch", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 6, name: "Interstellar", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 7, name: "E Tranzact", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 8, name: "Coral Pay", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Down", enabled: true },
];

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-[#22C55E]' : 'bg-gray-200'
            }`}
    >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
        />
    </button>
);

// Filter definitions
const filters: Filter[] = [
    {
        key: "channel",
        label: "All Channels",
        options: [
            { label: "NIP", value: "NIP" },
            { label: "NEFT", value: "NEFT" },
            { label: "RTGS", value: "RTGS" },
        ],
    },
    {
        key: "defaultProvider",
        label: "Default Provider",
        options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
        ],
    },
    {
        key: "status",
        label: "All Statuses",
        options: [
            { label: "Active", value: "Active" },
            { label: "Down", value: "Down" },
        ],
    },
];

const PaymentProviders = () => {
    const [providers, setProviders] = useState<Provider[]>(providersData);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [isViewProviderModalOpen, setIsViewProviderModalOpen] = useState(false);
    const [isEditProviderModalOpen, setIsEditProviderModalOpen] = useState(false);
    const [isDeactivateProviderModalOpen, setIsDeactivateProviderModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

    const handleToggle = (providerId: number) => {
        setProviders(prevProviders =>
            prevProviders.map(provider =>
                provider.id === providerId
                    ? { ...provider, enabled: !provider.enabled }
                    : provider
            )
        );
    };

    // Column definitions
    const columns: Column<Provider>[] = [
        { key: "name", header: "Provider Name", sortable: true },
        { key: "code", header: "Provider Code" },
        { key: "banksSupported", header: "Banks Supported" },
        { key: "channelsSupported", header: "Channels Supported" },
        { key: "isDefault", header: "Default..." },
        { key: "successRate", header: "% Success" },
        { key: "avgResponse", header: "Avg. Res..." },
        {
            key: "status",
            header: "Status",
            render: (item) => (
                <span className={`text-sm font-medium ${item.status === "Active" ? "text-[#27920B]" : "text-red-500"
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: "enabled",
            header: "",
            render: (item) => (
                <Toggle checked={item.enabled} onChange={() => handleToggle(item.id)} />
            )
        },
    ];

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewProvider = (provider: Provider) => {
        setSelectedProvider(provider);
        setIsViewProviderModalOpen(true);
        setOpenDropdown(null);
    };

    const handleEditProvider = (provider: Provider) => {
        setSelectedProvider(provider);
        setIsEditProviderModalOpen(true);
        setOpenDropdown(null);
    };

    const handleEditFromView = (provider: Provider) => {
        setSelectedProvider(provider);
        setIsViewProviderModalOpen(false);
        setIsEditProviderModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewProviderModalOpen(false);
        setSelectedProvider(null);
    };

    const handleCloseEditModal = () => {
        setIsEditProviderModalOpen(false);
        setSelectedProvider(null);
    };

    const handleUpdateProvider = (formData: any, paymentTypes: any[]) => {
        console.log("Updated provider data:", formData);
        console.log("Updated payment types:", paymentTypes);
        // Here you would make the API call to update the provider
        setIsEditProviderModalOpen(false);
        setSelectedProvider(null);
    };

    const handleDeactivateProvider = (provider: Provider) => {
        setSelectedProvider(provider);
        setIsDeactivateProviderModalOpen(true);
        setOpenDropdown(null);
    };

    const handleConfirmDeactivate = () => {
        console.log("Deactivating provider:", selectedProvider);
        // Here you would make the API call to deactivate the provider
        setIsDeactivateProviderModalOpen(false);
        setSelectedProvider(null);
    };

    const handleCloseDeactivateModal = () => {
        setIsDeactivateProviderModalOpen(false);
        setSelectedProvider(null);
    };

    return (
        <>
            <DataTable
                data={providers}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search user name,..."
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
                rowActions={(item) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProvider(item)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Provider Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditProvider(item)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Provider Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeactivateProvider(item)}>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate Provider
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                pageSize={10}
            />

            <ViewProviderModal
                isOpen={isViewProviderModalOpen}
                onClose={handleCloseViewModal}
                provider={selectedProvider}
                onEdit={handleEditFromView}
            />

            <AddPaymentProviderModal
                isOpen={isEditProviderModalOpen}
                onClose={handleCloseEditModal}
                provider={selectedProvider}
                mode="edit"
                onNextStep={handleUpdateProvider}
            />

            <DeactivateBankModal
                isOpen={isDeactivateProviderModalOpen}
                onClose={handleCloseDeactivateModal}
                item={selectedProvider}
                onConfirm={handleConfirmDeactivate}
                itemType="Provider"
                title="Deactivate Payment Provider?"
                description="Are you sure you want to deactivate this payment provider?"
            />
        </>
    );
};

export default PaymentProviders;
