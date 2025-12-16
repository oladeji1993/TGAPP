"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, User, LogOut } from "lucide-react";

interface NavbarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Navbar = ({ isSidebarOpen, toggleSidebar }: NavbarProps) => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.push('/auth/login');
    };

    return (
        <nav className={`fixed top-0 right-0 h-16 bg-white border-b border-[#D9D9D9] z-30 transition-all duration-300 ${isSidebarOpen ? 'lg:left-56' : 'left-0'}`}>
            <div className="h-full px-4 sm:px-6 flex items-center justify-between">
                {/* Left Side - Hamburger + Title */}
                <div className="flex items-center gap-3">
                    {/* Hamburger Menu Button */}
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-base sm:text-lg font-semibold text-gray-900">
                        Payment-Hub Admin
                    </h1>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Notification Bell */}
                    <button className="p-2 sm:p-2.5 bg-[#FEEBEB] hover:bg-[#fde0e0] rounded-xl transition-colors relative">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#F60E0E]" />
                    </button>
                    
                    {/* Divider - hidden on mobile */}
                    <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

                    {/* User Profile */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-lg px-1 sm:px-2 py-1 transition-colors"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            </div>
                            <svg 
                                className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <div className="hidden md:block text-left">
                                <div className="text-sm font-medium text-gray-900">Sterling Administrator</div>
                                <div className="text-xs text-gray-500">Corporate User</div>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-red-600"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;