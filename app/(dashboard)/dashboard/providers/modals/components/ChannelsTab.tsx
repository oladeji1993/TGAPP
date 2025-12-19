"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface ChannelData {
    name: string;
    status: string;
    priority: string;
    isDefault: boolean;
}

const ChannelsTab: React.FC = () => {
    const [openChannelDropdown, setOpenChannelDropdown] = useState<string | null>(null);

    const channelsData: ChannelData[] = [
        { name: "OneBank", status: "Active", priority: "Default", isDefault: true },
        { name: "Altbank", status: "Active", priority: "2", isDefault: false },
        { name: "Banca", status: "Active", priority: "Default", isDefault: true },
        { name: "Sterling USSD", status: "Active", priority: "3", isDefault: false },
    ];

    const handleChannelAction = (channel: ChannelData, action: string) => {
        console.log(`${action} channel:`, channel);
        setOpenChannelDropdown(null);
    };

    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Channels Supported</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="flex px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700">Channel Name</span>
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 text-center">Status</span>
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 text-center">Priority</span>
                    <span className="w-16 text-xs sm:text-sm font-medium text-gray-700 text-center">More</span>
                </div>

                {/* Channel Rows */}
                <div className="max-h-60 overflow-y-auto">
                    {channelsData.map((channel) => (
                        <div key={channel.name} className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 last:border-b-0">
                            <span className="flex-1 text-xs sm:text-sm text-gray-900">{channel.name}</span>
                            <div className="flex-1 flex justify-center">
                                <span className="text-xs sm:text-sm text-gray-600">{channel.status}</span>
                            </div>
                            <div className="flex-1 flex justify-center">
                                {channel.isDefault ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600">
                                        Default
                                    </span>
                                ) : (
                                    <span className="text-xs sm:text-sm text-gray-600">{channel.priority}</span>
                                )}
                            </div>
                            <div className="w-16 relative flex justify-center">
                                <button
                                    onClick={() => setOpenChannelDropdown(
                                        openChannelDropdown === channel.name ? null : channel.name
                                    )}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                </button>

                                {openChannelDropdown === channel.name && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setOpenChannelDropdown(null)}
                                        />
                                        <div className="absolute right-0 top-8 z-20 w-32 sm:w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                                            <button
                                                onClick={() => handleChannelAction(channel, "Set Default")}
                                                className="w-full px-2 sm:px-3 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Set Default
                                            </button>
                                            <button
                                                onClick={() => handleChannelAction(channel, "Edit Priority")}
                                                className="w-full px-2 sm:px-3 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Edit Priority
                                            </button>
                                            <button
                                                onClick={() => handleChannelAction(channel, "Deactivate")}
                                                className="w-full px-2 sm:px-3 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Deactivate
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ChannelsTab;
