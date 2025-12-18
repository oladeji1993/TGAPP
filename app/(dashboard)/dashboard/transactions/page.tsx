"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Download, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

// Transaction data type
interface Transaction {
    id: number;
    sessionId: string;
    transDate: string;
    channel: string;
    paymentType: string;
    amount: string;
    provider: string;
    status: string;
}

// Sample data
const transactionsData: Transaction[] = [
    { id: 1, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "OneBank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NIP", status: "Successful" },
    { id: 2, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Altbank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NPS", status: "Successful" },
    { id: 3, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Banca", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NEFT", status: "Successful" },
    { id: 4, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Onebank", paymentType: "Airtime", amount: "N000,000,000.00", provider: "Quickteller", status: "Successful" },
    { id: 5, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "OneBank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NIP", status: "Successful" },
    { id: 6, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Altbank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NPS", status: "Pending" },
    { id: 7, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Banca", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NEFT", status: "Reversed" },
    { id: 8, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Onebank", paymentType: "Airtime", amount: "N000,000,000.00", provider: "Quickteller", status: "Failed" },
    { id: 9, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "OneBank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NIP", status: "Successful" },
    { id: 10, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Altbank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NPS", status: "Successful" },
    { id: 11, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Banca", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NEFT", status: "Successful" },
    { id: 12, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Onebank", paymentType: "Airtime", amount: "N000,000,000.00", provider: "Quickteller", status: "Successful" },
    { id: 13, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "OneBank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NIP", status: "Successful" },
    { id: 14, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Altbank", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NPS", status: "Pending" },
    { id: 15, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Banca", paymentType: "Transfer", amount: "N000,000,000.00", provider: "NEFT", status: "Reversed" },
    { id: 16, sessionId: "000015200420193803000884...", transDate: "12/12/2025 - 12:00PM", channel: "Onebank", paymentType: "Airtime", amount: "N000,000,000.00", provider: "Quickteller", status: "Failed" },
];

const TransactionsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Successful": return "text-[#27920B]";
            case "Pending": return "text-[#F59E0B]";
            case "Reversed": return "text-[#F97316]";
            case "Failed": return "text-[#EF4444]";
            default: return "text-gray-600";
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setHasSearched(true);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.size === transactionsData.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(transactionsData.map(t => t.id)));
        }
    };

    const handleSelectRow = (id: number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const totalPages = Math.ceil(transactionsData.length / pageSize);
    const paginatedData = transactionsData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-xl font-bold text-gray-900">Transaction Status</h1>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div>
                    <p className="text-xs text-gray-500 mb-1">Search for Transactions</p>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter account number, reference ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-gray-200 self-end mb-0.5"></div>

                {/* Filter Label */}
                <span className="text-sm text-gray-500 self-end mb-2">Filter by:</span>

                {/* Channel Filter */}
                <div>
                    <p className="text-xs text-gray-500 mb-1">Channel</p>
                    <div className="relative">
                        <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none w-36">
                            <option>All Channels</option>
                            <option>OneBank</option>
                            <option>Altbank</option>
                            <option>Banca</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Provider Filter */}
                <div>
                    <p className="text-xs text-gray-500 mb-1">Provider</p>
                    <div className="relative">
                        <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none w-36">
                            <option>All Providers</option>
                            <option>NIP</option>
                            <option>NPS</option>
                            <option>NEFT</option>
                            <option>Quickteller</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <div className="relative">
                        <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none w-32">
                            <option>All Statuses</option>
                            <option>Successful</option>
                            <option>Pending</option>
                            <option>Reversed</option>
                            <option>Failed</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* More Filters */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium self-end">
                    More Filters
                    <SlidersHorizontal className="w-4 h-4" />
                </button>

                {/* Export */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium self-end">
                    Export
                    <Download className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            {!hasSearched ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-32 text-center border-t border-gray-200">
                    <div className="mb-4">
                        <Image src="/dashboard/transaction-icon.svg" alt="More" width={50} height={50}/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions listed</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                        Search for transactions above using Search above and filter results afterwards.
                    </p>
                </div>
            ) : (
                /* Table */
                <div className="border-t border-b border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F5F5F5]">
                                <tr>
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === transactionsData.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Session/Reference ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center gap-1">
                                            Trans. Date & Time
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Channel</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Type</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center gap-1">
                                            Amount
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Provider</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((transaction, index) => (
                                    <tr key={transaction.id} className={index % 2 === 1 ? 'bg-[#F9F9F9]' : 'bg-white'}>
                                        <td className="px-4 py-2.5">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(transaction.id)}
                                                onChange={() => handleSelectRow(transaction.id)}
                                                className="w-4 h-4 rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.sessionId}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.transDate}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.channel}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.paymentType}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.amount}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{transaction.provider}</td>
                                        <td className="px-4 py-2.5">
                                            <span className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <Search className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end gap-2 py-4 px-4 text-sm text-gray-600">
                        <span>Showing page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
