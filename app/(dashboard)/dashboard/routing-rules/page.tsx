"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

const RoutingRulesPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Routing Rules</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </Button>
                    <Button size="sm" className="gap-2 bg-gray-900 hover:bg-gray-800">
                        <Plus className="w-4 h-4" />
                        Add Rule
                    </Button>
                </div>
            </div>

            {/* Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Transaction Routing Rules</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No routing rules configured</h3>
                        <p className="text-sm text-gray-500 mb-4">Create routing rules to direct transactions</p>
                        <Button size="sm" className="gap-2 bg-gray-900 hover:bg-gray-800">
                            <Plus className="w-4 h-4" />
                            Add Rule
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RoutingRulesPage;
