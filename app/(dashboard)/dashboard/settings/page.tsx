"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

// Simple Toggle Component
const Toggle = ({ defaultChecked = false }: { defaultChecked?: boolean }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                checked ? 'bg-gray-900' : 'bg-gray-200'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    checked ? 'translate-x-4' : 'translate-x-0.5'
                }`}
            />
        </button>
    );
};

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <Button size="sm" className="gap-2 bg-gray-900 hover:bg-gray-800">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            {/* General Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">General Settings</CardTitle>
                    <CardDescription>Configure general application settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="appName">Application Name</Label>
                            <Input id="appName" defaultValue="Payment Hub Admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Input id="timezone" defaultValue="Africa/Lagos (GMT+1)" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <CardDescription>Manage notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Transaction Alerts</p>
                            <p className="text-sm text-gray-500">Get notified for failed transactions</p>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">System Updates</p>
                            <p className="text-sm text-gray-500">Receive notifications about system updates</p>
                        </div>
                        <Toggle />
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Security</CardTitle>
                    <CardDescription>Manage security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Session Timeout</p>
                            <p className="text-sm text-gray-500">Auto logout after 30 minutes of inactivity</p>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
