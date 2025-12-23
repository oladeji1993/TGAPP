"use client";

import React, { useState } from "react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import ChannelDetailsModal from "./ChannelDetailsModal";
import AddChannelModal from "./AddChannelModal";

// Channel data type
interface Channel {
    id: number;
    name: string;
    channelType: string;
    lastModified: string;
    defaultProvider: string;
    supportedPayments: string;
    status: string;
}

// Channel form data type
interface ChannelFormData {
    name: string;
    channelCode: string;
    channelType: string;
    description: string;
    defaultProviderSet: boolean;
    status: string;
    loggingLevel: string;
}

// Column definitions
const columns: Column<Channel>[] = [
    { key: "name", header: "Channel Name", sortable: true },
    { key: "channelType", header: "Channel Type" },
    { key: "lastModified", header: "Last Modified on" },
    { key: "defaultProvider", header: "Default Provi..." },
    { key: "supportedPayments", header: "Supported pa...", sortable: true },
    { key: "status", header: "Status" },
];

// Filter definitions
const filters: Filter[] = [
    {
        key: "channelType",
        label: "All Channel Types",
        options: [
            { label: "Retail", value: "Retail" },
            { label: "Corporate", value: "Corporate" },
            { label: "USSD", value: "USSD" },
            { label: "Business", value: "Business" },
        ],
    },
    {
        key: "paymentType",
        label: "All Payment Types",
        options: [
            { label: "Providers", value: "Providers" },
            { label: "User Management", value: "User Management" },
        ],
    },
];

const ChannelsPage = () => {
    const [channelsData, setChannelsData] = useState<Channel[]>([
        { id: 1, name: "OneBank", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
        { id: 2, name: "AltBank", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
        { id: 3, name: "Sterling Pro", channelType: "Corporate", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
        { id: 4, name: "AltPro", channelType: "Corporate", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
        { id: 5, name: "Gazelle", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
        { id: 6, name: "USSD", channelType: "USSD", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
        { id: 7, name: "Banca", channelType: "Business", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "Providers", status: "Enabled" },
        { id: 8, name: "altinvest", channelType: "Retail", lastModified: "12/12/2025 - 12:00PM", defaultProvider: "Yes", supportedPayments: "User Management", status: "Enabled" },
    ]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editChannel, setEditChannel] = useState<Channel | null>(null);

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleViewDetails = (item: Channel) => {
        setSelectedChannel(item);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (channel: Channel) => {
        setEditChannel(channel);
        setIsAddModalOpen(true);
    };

    const handleDeactivate = (channel: Channel) => {
        console.log("Deactivating channel:", channel);
        // Add deactivate logic here
    };

    const handleRemove = (channel: Channel) => {
        console.log("Removing channel:", channel);
        // Add remove logic here
    };

    const handleAddNewChannel = () => {
        setEditChannel(null);
        setIsAddModalOpen(true);
    };

    const handleSaveChannel = (data: ChannelFormData) => {
        if (editChannel) {
            // Update existing channel
            const updatedChannel: Channel = {
                id: editChannel.id,
                name: data.name,
                channelType: data.channelType,
                lastModified: new Date().toLocaleString(),
                defaultProvider: data.defaultProviderSet ? "Yes" : "No",
                supportedPayments: "Providers", // This would be set based on actual logic
                status: data.status,
            };
            setChannelsData(prev => prev.map(c => c.id === editChannel.id ? updatedChannel : c));
        } else {
            // Add new channel
            const newChannel: Channel = {
                id: channelsData.length + 1,
                name: data.name,
                channelType: data.channelType,
                lastModified: new Date().toLocaleString(),
                defaultProvider: data.defaultProviderSet ? "Yes" : "No",
                supportedPayments: "Providers", // This would be set based on actual logic
                status: data.status,
            };
            setChannelsData(prev => [...prev, newChannel]);
        }
        console.log("Channel saved:", data);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Channels</h1>
                <button
                    onClick={handleAddNewChannel}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <span>Add New Channel</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <DataTable
                data={channelsData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search Channels"
                showDateFilter={false}
                showRefresh={false}
                onExport={handleExport}
                rowActions={(item) => (
                    <button
                        className="p-1 hover:bg-gray-100 ml-2 rounded"
                        onClick={() => handleViewDetails(item)}
                    >
                        <Image src="/dashboard/search.svg" alt="View Details" width={20} height={20} />
                    </button>
                )}
                pageSize={10}
            />

            <ChannelDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedChannel(null);
                }}
                channel={selectedChannel}
                onEdit={(channel) => {
                    setIsDetailsModalOpen(false);
                    setSelectedChannel(null);
                    handleEdit(channel);
                }}
                onDeactivate={(channel) => {
                    setIsDetailsModalOpen(false);
                    setSelectedChannel(null);
                    handleDeactivate(channel);
                }}
                onRemove={(channel) => {
                    setIsDetailsModalOpen(false);
                    setSelectedChannel(null);
                    handleRemove(channel);
                }}
            />

            <AddChannelModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditChannel(null);
                }}
                onSave={handleSaveChannel}
                editChannel={editChannel}
            />
        </div>
    );
};

export default ChannelsPage;
