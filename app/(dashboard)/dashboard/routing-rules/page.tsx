"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PaymentRoutingRules from "./PaymentRoutingRules";
import VASRoutingRules from "./VASRoutingRules";

const RoutingRulesPage = () => {
    const [activeTab, setActiveTab] = useState<'payment' | 'vas'>('payment');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">Routing Rules</h1>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                    <span>Add New Rule</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="inline-flex items-center bg-[#F0F0F0] rounded-lg p-1">
                <button
                    onClick={() => setActiveTab('payment')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'payment'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    Payment Providers
                </button>
                <button
                    onClick={() => setActiveTab('vas')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'vas'
                            ? 'bg-[#F60E0E] text-white'
                            : 'text-gray-700'
                    }`}
                >
                    VAS Providers
                </button>
            </div>

            {/* Dynamic Content */}
            {activeTab === 'payment' ? <PaymentRoutingRules /> : <VASRoutingRules />}
        </div>
    );
};

export default RoutingRulesPage;
