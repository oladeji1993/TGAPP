"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaymentType {
    id: number;
    type: string;
    currency: string;
    defaultProvider: string;
    status: 'Active' | 'Inactive';
}

interface PaymentTypesTabProps {
    channelName: string;
}

// Sample payment types data
const paymentTypesData: PaymentType[] = [
    { id: 1, type: "Transfer", currency: "NGN", defaultProvider: "NIP", status: "Active" },
    { id: 2, type: "Airtime", currency: "NGN", defaultProvider: "Quickteller", status: "Active" },
    { id: 3, type: "Electricity Bills", currency: "NGN", defaultProvider: "Quickteller", status: "Active" },
    { id: 4, type: "Cable TV", currency: "NGN", defaultProvider: "Quickteller", status: "Active" },
    { id: 5, type: "Government Payments", currency: "NGN", defaultProvider: "Quickteller", status: "Active" },
    { id: 6, type: "Tolls", currency: "NGN", defaultProvider: "CreditSwitch", status: "Active" },
];

const PaymentTypesTab: React.FC<PaymentTypesTabProps> = ({ channelName }) => {
    const handleAction = (action: string, paymentType: PaymentType) => {
        console.log(`${action} payment type:`, paymentType);
    };

    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-4">
                Supported Payment Types
            </h3>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-3">Payment Type</div>
                    <div className="col-span-2">Curr...</div>
                    <div className="col-span-3">Default Pro...</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Mo...</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {paymentTypesData.map((paymentType) => (
                        <div key={paymentType.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                            <div className="col-span-3">
                                <span className="text-sm font-medium text-gray-900">{paymentType.type}</span>
                            </div>

                            <div className="col-span-2">
                                <span className="text-sm text-gray-900">{paymentType.currency}</span>
                            </div>

                            <div className="col-span-3">
                                <span className="text-sm text-gray-900">{paymentType.defaultProvider}</span>
                            </div>

                            <div className="col-span-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentType.status === 'Active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {paymentType.status}
                                </span>
                            </div>

                            <div className="col-span-2 flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreVertical className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32">
                                        <DropdownMenuItem onClick={() => handleAction('edit', paymentType)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAction('disable', paymentType)}>
                                            Disable
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleAction('remove', paymentType)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Remove
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

export default PaymentTypesTab;