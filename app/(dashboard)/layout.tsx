"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/navbar";
import Menu from "@/components/shared/menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Menu */}
            <Menu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Navbar */}
            <Navbar 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
            />

            {/* Main Content */}
            <main 
                className={`transition-all duration-300 ${
                    isSidebarOpen ? 'ml-72' : 'ml-16'
                } mt-16 sm:mt-20 p-3 sm:p-6 min-h-screen`}
            >
                {children}
            </main>
        </div>
    );
}
