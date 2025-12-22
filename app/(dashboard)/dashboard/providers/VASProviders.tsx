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

// VAS Provider data type
interface VASProvider {
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

// Sample VAS data
const vasProvidersData: VASProvider[] = [
    { id: 1, name: "Quickteller", code: "012345678", banksSupported: 32, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
    { id: 2, name: "Credit Switch", code: "012345678", banksSupported: 24, channelsSupported: 10, isDefault: "Yes", successRate: "95%", avgResponse: "15s", status: "Active", enabled: true },
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

// Filter definitions for VAS
const filters: Filter[] = [
    {
        key: "channel",
        label: "All Channels",
        options: [
            { label: "Quickteller", value: "Quickteller" },
            { label: "Credit Switch", value: "Credit Switch" },
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

const VASProviders = () => {
    const [providers, setProviders] = useState<VASProvider[]>(vasProvidersData);
    const [isViewProviderModalOpen, setIsViewProviderModalOpen] = useState(false);
    const [isEditProviderModalOpen, setIsEditProviderModalOpen] = useState(false);
    const [isDeactivateProviderModalOpen, setIsDeactivateProviderModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<VASProvider | null>(null);

    const handleToggle = (providerId: number) => {
        setProviders(prevProviders =>
            prevProviders.map(provider =>
                provider.id === providerId
                    ? { ...provider, enabled: !provider.enabled }
                    : provider
            )
        );
    };

    // Column definitions for VAS
    const columns: Column<VASProvider>[] = [
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
        console.log("Exporting VAS data...");
    };

    const handleViewProvider = (provider: VASProvider) => {
        setSelectedProvider(provider);
        setIsViewProviderModalOpen(true);
    };

    const handleEditProvider = (provider: VASProvider) => {
        setSelectedProvider(provider);
        setIsEditProviderModalOpen(true);
    };

    const handleEditFromView = (provider: VASProvider) => {
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

    const handleDeactivateProvider = (provider: VASProvider) => {
        setSelectedProvider(provider);
        setIsDeactivateProviderModalOpen(true);
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
                title="Deactivate VAS Provider?"
                description="Are you sure you want to deactivate this VAS provider?"
            />
        </>
    );
};

export default VASProviders;