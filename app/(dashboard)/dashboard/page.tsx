"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ArrowUpDown, Wallet } from "lucide-react";
import Image from "next/image";

const DashboardPage = () => {
    const gateways = [
        { name: "NIP", color: "bg-green-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "NEFT", color: "bg-lime-400", count: "123,456", volume: "NGN 122,094,123" },
        { name: "RTGS", color: "bg-pink-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "Interswitch", color: "bg-purple-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "Coral Pay", color: "bg-cyan-400", count: "123,456", volume: "NGN 122,094,123" },
        { name: "Interstellar", color: "bg-blue-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "NPS", color: "bg-teal-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "eTranzact", color: "bg-orange-500", count: "123,456", volume: "NGN 122,094,123" },
        { name: "Credit Switch", color: "bg-red-500", count: "123,456", volume: "NGN 122,094,123" },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                    <span className="text-xs sm:text-sm text-gray-500">Last updated 30 seconds ago</span>
                </div>
                <select className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4726CD]">
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Total Transactions Count */}
                <div className="relative overflow-hidden rounded-xl p-6 sm:p-8 text-white" style={{ background: 'linear-gradient(to left, #592FFF, #7c5aff)' }}>
                    <div className="relative z-10">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Total Transactions Count</h3>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 break-all">122,403,773,385</p>
                        <div className="flex items-center gap-2 text-green-400">
                            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-semibold">79%</span>
                        </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-8 opacity-20">
                        <Image src="/dashboard/arrows-up-down.svg" alt="Arrow Up" width={120} height={120} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
                    </div>
                </div>

                {/* Total Transactions Volume */}
                <div className="relative overflow-hidden rounded-xl p-6 sm:p-8 text-white" style={{ background: 'linear-gradient(to left, #04B1FB, #38c0fd)' }}>
                    <div className="relative z-10">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Total Transactions Volume</h3>
                        <p className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 break-all">NGN 122,403,773,385,395.09</p>
                        <div className="flex items-center gap-2 text-red-500">
                            <span className="text-xs sm:text-sm font-semibold">1%</span>
                        </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-8 opacity-20">
                        <Image src="/dashboard/cash-line.svg" alt="Cash Line" width={160} height={160} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Payment Gateway Transaction Count */}
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Payment Gateway Transaction Count</h3>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                            {/* Donut Chart */}
                            <div className="relative flex-shrink-0 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#22c55e" strokeWidth="35" strokeDasharray="56 440" className="chart-segment" style={{"--final-offset": "0"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#a3e635" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-56" className="chart-segment" style={{"--final-offset": "-56"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#ec4899" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-112" className="chart-segment" style={{"--final-offset": "-112"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#a855f7" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-168" className="chart-segment" style={{"--final-offset": "-168"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#22d3ee" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-224" className="chart-segment" style={{"--final-offset": "-224"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#3b82f6" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-280" className="chart-segment" style={{"--final-offset": "-280"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#14b8a6" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-336" className="chart-segment" style={{"--final-offset": "-336"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#f97316" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-392" className="chart-segment" style={{"--final-offset": "-392"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#ef4444" strokeWidth="35" strokeDasharray="8 440" strokeDashoffset="-448" className="chart-segment" style={{"--final-offset": "-448"} as React.CSSProperties} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                                        <Image src="/dashboard/arrows.svg" alt="Arrows" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 w-full space-y-2 sm:space-y-3">
                                {gateways.map((gateway) => (
                                    <div key={gateway.name} className="flex items-center justify-between text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${gateway.color}`}></div>
                                            <span className="text-gray-700">{gateway.name}</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{gateway.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Gateway Transaction Volume */}
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Payment Gateway Transaction Volume</h3>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                            {/* Donut Chart */}
                            <div className="relative flex-shrink-0 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#22c55e" strokeWidth="35" strokeDasharray="56 440" className="chart-segment" style={{"--final-offset": "0"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#a3e635" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-56" className="chart-segment" style={{"--final-offset": "-56"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#ec4899" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-112" className="chart-segment" style={{"--final-offset": "-112"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#a855f7" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-168" className="chart-segment" style={{"--final-offset": "-168"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#22d3ee" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-224" className="chart-segment" style={{"--final-offset": "-224"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#3b82f6" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-280" className="chart-segment" style={{"--final-offset": "-280"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#14b8a6" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-336" className="chart-segment" style={{"--final-offset": "-336"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#f97316" strokeWidth="35" strokeDasharray="56 440" strokeDashoffset="-392" className="chart-segment" style={{"--final-offset": "-392"} as React.CSSProperties} />
                                    <circle cx="100" cy="100" r="65" fill="none" stroke="#ef4444" strokeWidth="35" strokeDasharray="8 440" strokeDashoffset="-448" className="chart-segment" style={{"--final-offset": "-448"} as React.CSSProperties} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                                        <Image src="/dashboard/cash-line-1.svg" alt="Cash Line" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8" />   
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 w-full space-y-2 sm:space-y-3">
                                {gateways.map((gateway) => (
                                    <div key={gateway.name} className="flex items-center justify-between text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${gateway.color}`}></div>
                                            <span className="text-gray-700 truncate">{gateway.name}</span>
                                        </div>
                                        <span className="font-semibold text-gray-900 whitespace-nowrap ml-2">{gateway.volume}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
