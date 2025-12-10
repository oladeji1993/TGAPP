"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ArrowRight, Calendar, FileText } from "lucide-react";

const TransactionsPage = () => {
    const [activeTab, setActiveTab] = useState<"inter" | "intra">("inter");
    const [paymentGateway, setPaymentGateway] = useState("NIP");
    const [transactionFlow, setTransactionFlow] = useState("Inward");
    const [searchWith, setSearchWith] = useState("Account Number");
    const [accountNumber, setAccountNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transactions Status Checker</h1>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#4726CD] text-[#4726CD] rounded-lg text-sm font-medium hover:bg-[#4726CD] hover:text-white transition-colors">
                    <span>Refresh</span>
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            {/* Main Card */}
            <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-0">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-gray-200 px-6 pt-6">
                        <button
                            onClick={() => setActiveTab("inter")}
                            className={`pb-3 text-sm font-medium transition-colors relative ${
                                activeTab === "inter"
                                    ? "text-[#4726CD]"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Inter-Bank
                            {activeTab === "inter" && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4726CD]"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("intra")}
                            className={`pb-3 text-sm font-medium transition-colors relative ${
                                activeTab === "intra"
                                    ? "text-[#4726CD]"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Intra-Bank
                            {activeTab === "intra" && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4726CD]"></div>
                            )}
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-4">
                        <div className="overflow-x-auto">
                            <div className="flex items-end gap-3 min-w-max">
                            {/* Payment Gateway */}
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Payment Gateway</label>
                                <select
                                    value={paymentGateway}
                                    onChange={(e) => setPaymentGateway(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent bg-white"
                                >
                                    <option>NIP</option>
                                    <option>NEFT</option>
                                    <option>RTGS</option>
                                </select>
                            </div>

                            {/* Transaction Flow */}
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Transaction flow</label>
                                <select
                                    value={transactionFlow}
                                    onChange={(e) => setTransactionFlow(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent bg-white"
                                >
                                    <option>Inward</option>
                                    <option>Outward</option>
                                </select>
                            </div>

                            {/* Search With */}
                            <div className="w-40">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Search with:</label>
                                <select
                                    value={searchWith}
                                    onChange={(e) => setSearchWith(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent bg-white"
                                >
                                    <option>Account Number</option>
                                    <option>Session ID</option>
                                </select>
                            </div>

                            {/* Account Number */}
                            <div className="w-48">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Account number</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Enter here"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent"
                                />
                            </div>

                            {/* Start Date */}
                            <div className="w-40">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Start date (From)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="dd/mm/yyyy"
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="pb-2">
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>

                            {/* End Date */}
                            <div className="w-40">
                                <label className="block text-xs font-medium text-gray-700 mb-2">End date (To)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="dd/mm/yyyy"
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD] focus:border-transparent"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="pb-2">
                                <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
                                    Search
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#4726CD] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                            <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#4726CD]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No status populated.</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md">Search status with account number or session ID</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;
