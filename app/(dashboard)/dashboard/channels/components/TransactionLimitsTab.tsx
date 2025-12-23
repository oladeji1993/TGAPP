"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionLimit {
    id: number;
    paymentType: string;
    currency: string;
    transactionLimit: string;
}

interface TransactionLimitsTabProps {
    channelName: string;
}

// Sample transaction limits data
const transactionLimitsData: TransactionLimit[] = [
    { id: 1, paymentType: "Transfer", currency: "NGN", transactionLimit: "Custom" },
    { id: 2, paymentType: "Airtime", currency: "NGN", transactionLimit: "Central Limit" },
    { id: 3, paymentType: "Electricity Bills", currency: "NGN", transactionLimit: "Central Limit" },
    { id: 4, paymentType: "Cable TV", currency: "NGN", transactionLimit: "Central Limit" },
    { id: 5, paymentType: "Government Payments", currency: "NGN", transactionLimit: "Central Limit" },
    { id: 6, paymentType: "Tolls", currency: "NGN", transactionLimit: "Central Limit" },
];

const TransactionLimitsTab: React.FC<TransactionLimitsTabProps> = ({ channelName }) => {
    const handleAction = (action: string, limit: TransactionLimit) => {
        console.log(`${action} transaction limit:`, limit);
    };

    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                Transaction Limits
            </h3>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-4">Payment Type</div>
                    <div className="col-span-2">Curr...</div>
                    <div className="col-span-4">Trx. Limit</div>
                    <div className="col-span-2">Mo...</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {transactionLimitsData.map((limit) => (
                        <div key={limit.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                            <div className="col-span-4">
                                <span className="text-sm font-medium text-gray-900">{limit.paymentType}</span>
                            </div>

                            <div className="col-span-2">
                                <span className="text-sm text-gray-900">{limit.currency}</span>
                            </div>

                            <div className="col-span-4">
                                <span className="text-sm text-gray-900">{limit.transactionLimit}</span>
                            </div>

                            <div className="col-span-2 flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreVertical className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32">
                                        <DropdownMenuItem onClick={() => handleAction('edit', limit)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAction('configure', limit)}>
                                            Configure
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleAction('reset', limit)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Reset
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionLimitsTab;