"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ChevronDown } from "lucide-react";
import Image from "next/image";

const DashboardPage = () => {
    const [chartType, setChartType] = useState("Transaction count");

    const providers = [
        { name: "NIP", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "NEFT", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "RTGS", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "Interswitch", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "InterStellar", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "NPS", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "E Tranzact", status: "Active", responseTime: "12ms", successRate: "93%" },
        { name: "Credit Switch", status: "Degraded", responseTime: "12ms", successRate: "93%" },
        { name: "QuickTeller", status: "Active", responseTime: "12ms", successRate: "93%" },
    ];

    const chartLegend = [
        { name: "NIP", color: "bg-green-500", count: "123,456" },
        { name: "NEFT", color: "bg-lime-200", count: "123,456" },
        { name: "RTGS", color: "bg-purple-400", count: "123,456" },
        { name: "Interswitch", color: "bg-orange-500", count: "123,456" },
        { name: "Coral Pay", color: "bg-yellow-300", count: "123,456" },
        { name: "Interstellar", color: "bg-green-300", count: "123,456" },
        { name: "NPS", color: "bg-cyan-300", count: "123,456" },
        { name: "eTranzact", color: "bg-amber-400", count: "123,456" },
        { name: "Credit Switch", color: "bg-red-500", count: "123,456" },
        { name: "Quick Teller", color: "bg-rose-700", count: "123,456" },
    ];

    const recentActivities = [
        { id: 1, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
        { id: 2, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
        { id: 3, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
        { id: 4, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
        { id: 5, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
        { id: 6, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
        { id: 7, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Update", description: "Updated NIP routing rule for Channel=OneBank", module: "Providers", status: "Completed" },
        { id: 8, performedOn: "12/12/2025 - 12:00PM", performedBy: "richard.damola@sterling.ng", actionType: "Delete", description: "Deleted User=oladeji.olanipekun@sterling.ng", module: "User Management", status: "Completed" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
                    <span className="text-xs sm:text-sm text-gray-500">Last updated 30 seconds ago</span>
                </div>
                <div className="relative">
                    <select className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-2 pr-10 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <option>Last 24 hours</option>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Transactions */}
                <Card className="border border-gray-200">
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Total Transactions</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900 break-all">₦270,076,402,204<span className="text-base sm:text-lg">.21</span></p>
                                <div className="flex items-center gap-1 mt-2 text-green-600">
                                    <ArrowUp className="w-3 h-3" />
                                    <span className="text-xs font-medium">2%</span>
                                    <span className="text-xs text-gray-500">Since last 24 hours</span>
                                </div>
                            </div>
                            <div>
                                <Image src="/dashboard/total.svg" alt="Total" width={34} height={34} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Successful Transactions */}
                <Card className="border border-gray-200">
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Successful Transactions</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900 break-all">₦270,076,402<span className="text-base sm:text-lg">.21</span></p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-xs text-green-600 font-medium">88%</span>
                                    <span className="text-xs text-gray-500">Success rate</span>
                                </div>
                            </div>
                            <div>
                                <Image src="/dashboard/successful.svg" alt="Success" width={34} height={34} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Failed Transactions */}
                <Card className="border border-gray-200">
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Failed Transactions</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">₦240,402<span className="text-base sm:text-lg">.21</span></p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-xs text-red-600 font-medium">8%</span>
                                    <span className="text-xs text-gray-500">Failure rate</span>
                                </div>
                            </div>
                            <div>
                                <Image src="/dashboard/failed.svg" alt="Failed" width={34} height={34} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reversed Transactions */}
                <Card className="border border-gray-200">
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Reversed Transactions</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">₦70,076,402<span className="text-base sm:text-lg">.21</span></p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-xs text-blue-600 font-medium">4%</span>
                                    <span className="text-xs text-gray-500">Reversed transactions</span>
                                </div>
                            </div>
                            <div className="">
                                <Image src="/dashboard/reversed.svg" alt="Reversed" width={34} height={34} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Provider Watchlist Title */}
            <h2 className="text-lg font-bold text-gray-900">Provider Watchlist</h2>

            {/* Provider Table and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Provider Status Table */}
                <Card className="border border-gray-200 p-0 overflow-hidden">
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr className="bg-[#F5F5F5] border-b border-gray-200">
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Provider</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Status</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Avg. Response T...</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">%Success Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {providers.map((provider) => (
                                    <tr key={provider.name}>
                                        <td className="px-4 py-2.5 text-sm text-gray-900">{provider.name}</td>
                                        <td className="px-4 py-2.5">
                                            <span className={`text-xs font-medium px-3 py-0.5 rounded-full ${
                                                provider.status === "Active" 
                                                    ? "bg-[#F1FBEE] text-[#27920B]" 
                                                    : "bg-gray-100 text-gray-600"
                                            }`}>
                                                {provider.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{provider.responseTime}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{provider.successRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Donut Chart */}
                <Card className="border border-gray-200">
                    <CardContent>
                        {/* Chart Type Selector */}
                        <div className="mb-6">
                            <div className="relative inline-block">
                                <select 
                                    value={chartType}
                                    onChange={(e) => setChartType(e.target.value)}
                                    className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none"
                                >
                                    <option>Transaction count</option>
                                    <option>Transaction volume</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                            {/* Donut Chart */}
                            <div className="relative flex-shrink-0 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#22c55e" strokeWidth="45" strokeDasharray="41 440" className="chart-segment" style={{"--final-offset": "0"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#d9f99d" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-41" className="chart-segment" style={{"--final-offset": "-41"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#c084fc" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-82" className="chart-segment" style={{"--final-offset": "-82"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#f97316" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-123" className="chart-segment" style={{"--final-offset": "-123"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#fde047" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-164" className="chart-segment" style={{"--final-offset": "-164"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#86efac" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-205" className="chart-segment" style={{"--final-offset": "-205"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#67e8f9" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-246" className="chart-segment" style={{"--final-offset": "-246"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#fbbf24" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-287" className="chart-segment" style={{"--final-offset": "-287"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#ef4444" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-328" className="chart-segment" style={{"--final-offset": "-328"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#be123c" strokeWidth="45" strokeDasharray="41 440" strokeDashoffset="-369" className="chart-segment" style={{"--final-offset": "-369"} as React.CSSProperties} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image src="/dashboard/arrows.svg" alt="Arrows" width={32} height={32} />
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
                                {chartLegend.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${item.color}`}></div>
                                            <span className="text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="text-gray-600">{item.count} <span className="text-gray-400 hidden sm:inline">Transactions</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                        View All Activity
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Activity Table */}
                <Card className="border border-gray-200 p-0 overflow-hidden">
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-[#F5F5F5] border-b border-gray-200">
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Performed On</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Performed by</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Action Type</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Description</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            Module
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Status</th>
                                    <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">More</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentActivities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.performedOn}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.performedBy}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.actionType}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.description}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.module}</td>
                                        <td className="px-4 py-2.5 text-sm text-gray-600">{activity.status}</td>
                                        <td className="px-4 py-2.5">
                                            <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <Image src="/dashboard/search.svg" alt="More" width={20} height={20}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
