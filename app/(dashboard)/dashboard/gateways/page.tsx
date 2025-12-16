"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MoreVertical, TrendingDown, TrendingUp } from "lucide-react";

const GatewaysPage = () => {
    const gateways = [
        { id: 1, name: "NIP", isDefault: true, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 2, name: "NEFT", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 3, name: "RTGS", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 4, name: "Coral Pay", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 5, name: "Interswitch", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 6, name: "Interstellar", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 7, name: "NPS", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 8, name: "eTranzact", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
        { id: 9, name: "Credit Switch", isDefault: false, banksInUse: 24, availInward: 95, availOutward: 54, avgDeliveryTime: "55s" },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Gateways Vendors</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4726CD] hover:bg-[#3818A0] text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add Vendor</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Gateways Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {gateways.map((gateway) => (
                    <Card key={gateway.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-5">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{gateway.name}</h3>
                                    {gateway.isDefault && (
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded whitespace-nowrap">
                                            Default
                                        </span>
                                    )}
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
                                    <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            {/* Banks in use */}
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <span className="text-xs sm:text-sm text-gray-600">Banks in use</span>
                                <span className="text-base sm:text-lg font-bold text-gray-900">{gateway.banksInUse}</span>
                            </div>

                            {/* Availability Stats */}
                            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                                    <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" />
                                    <span className="text-gray-600 whitespace-nowrap">Avl. Inward</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                                    <span className="text-gray-600 whitespace-nowrap">Avl. Outward</span>
                                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <span className="text-base sm:text-lg font-bold text-green-600">{gateway.availInward}%</span>
                                <span className="text-base sm:text-lg font-bold text-red-600">{gateway.availOutward}%</span>
                            </div>

                            {/* Delivery Time */}
                            <div className="flex items-center justify-between pt-2 sm:pt-3">
                                <span className="text-xs sm:text-sm text-gray-600">Avg. delivery time</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{gateway.avgDeliveryTime}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GatewaysPage;
