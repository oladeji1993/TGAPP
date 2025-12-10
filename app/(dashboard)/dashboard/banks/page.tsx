"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Download, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Plus } from "lucide-react";

const BanksPage = () => {
    const [selectedBanks, setSelectedBanks] = useState<number[]>([]);
    
    const banks = [
        { id: 1, code: "012345678", name: "Sterling Bank", type: "Conventional", gateway: "NIP", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 2, code: "012345678", name: "Jaiz Bank", type: "Non-interest", gateway: "Interswitch", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 3, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", gateway: "NEFT", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 4, code: "012345678", name: "Paystack-Titan", type: "Fintech", gateway: "RTGS", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 5, code: "012345678", name: "Sterling Bank", type: "Conventional", gateway: "NIP", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 6, code: "012345678", name: "Jaiz Bank", type: "Non-interest", gateway: "NPS", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 7, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", gateway: "Interstellar", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 8, code: "012345678", name: "Paystack-Titan", type: "Fintech", gateway: "NPS", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 9, code: "012345678", name: "Sterling Bank", type: "Conventional", gateway: "NIP", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 10, code: "012345678", name: "Jaiz Bank", type: "Non-interest", gateway: "Interswitch", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 11, code: "012345678", name: "FairMoney Microfinance Bank", type: "Microfinance", gateway: "NEFT", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
        { id: 12, code: "012345678", name: "Paystack-Titan", type: "Fintech", gateway: "RTGS", contact: "emailaddress@mail.com", availIn: "95%", availOut: "98%", payGat: 5 },
    ];

    const toggleSelectAll = () => {
        if (selectedBanks.length === banks.length) {
            setSelectedBanks([]);
        } else {
            setSelectedBanks(banks.map(b => b.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedBanks(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Banks</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4726CD] hover:bg-[#3818A0] text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add New Bank</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name, code..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent"
                    />
                </div>

                {/* Bank Type Filter */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent bg-white">
                    <option>All Bank Types</option>
                    <option>Conventional</option>
                    <option>Non-interest</option>
                    <option>Microfinance</option>
                    <option>Fintech</option>
                </select>

                {/* Export Button */}
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <span>Export</span>
                    <Download className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <Card className="border border-gray-200">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left w-12">
                                        <input
                                            type="checkbox"
                                            checked={selectedBanks.length === banks.length}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-[#4726CD] focus:ring-[#4726CD]"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Bank Code</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            Bank Name
                                            <ChevronDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Bank Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Default Gate...</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Contact Personnel</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Avl. In.</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Avl. Out</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">Pay. Gat...</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap">More</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {banks.map((bank) => (
                                    <tr key={bank.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedBanks.includes(bank.id)}
                                                onChange={() => toggleSelect(bank.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#4726CD] focus:ring-[#4726CD]"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{bank.code}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 font-medium whitespace-nowrap">{bank.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{bank.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{bank.gateway}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{bank.contact}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-orange-500 whitespace-nowrap">{bank.availIn}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-green-600 whitespace-nowrap">{bank.availOut}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{bank.payGat}</td>
                                        <td className="px-4 py-3">
                                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200">
                        <div className="text-xs sm:text-sm text-gray-600">
                            Showing page 1 of 10
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                <ChevronLeft className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                                <ChevronRight className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BanksPage;
