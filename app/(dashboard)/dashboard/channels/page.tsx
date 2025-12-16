"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

const ChannelsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Channels</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </Button>
                    <Button size="sm" className="gap-2 bg-gray-900 hover:bg-gray-800">
                        <Plus className="w-4 h-4" />
                        Add Channel
                    </Button>
                </div>
            </div>

            {/* Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Payment Channels</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No channels configured</h3>
                        <p className="text-sm text-gray-500 mb-4">Add payment channels for transaction processing</p>
                        <Button size="sm" className="gap-2 bg-gray-900 hover:bg-gray-800">
                            <Plus className="w-4 h-4" />
                            Add Channel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChannelsPage;
