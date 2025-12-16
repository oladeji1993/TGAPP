"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/navbar";
import Menu from "@/components/shared/menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Set sidebar open by default on large screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        
        // Initial check
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Menu */}
            <Menu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Navbar */}
            <Navbar 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
            />

            {/* Main Content */}
            <main className={`mt-16 p-4 sm:p-6 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-56' : 'ml-0'}`}>
                {children}
            </main>
        </div>
    );
}
