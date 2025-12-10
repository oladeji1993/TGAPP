"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CheckCheck,
    Landmark,
    Wallet,
    ChevronLeft,
    User
} from "lucide-react";
import Image from "next/image";

interface MenuProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

interface MenuItem {
    icon: string;
    label: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { icon: '/dashboard/home.svg', label: "Dashboard", href: "/dashboard" },
    { icon: '/dashboard/trans-checker.svg', label: "Trans. Status", href: "/dashboard/transactions" },
    { icon: '/dashboard/banks.svg', label: "Banks", href: "/dashboard/banks" },
    { icon: '/dashboard/gateways.svg', label: "Pay Gateways", href: "/dashboard/gateways" },
];

const Menu = ({ isOpen, toggleSidebar }: MenuProps) => {
    const pathname = usePathname();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${isOpen ? 'w-72' : 'w-16'
                }`}
        >
            <div className="h-full flex flex-col">
                {/* User Avatar Section */}
                <div className="h-20 bg-[#4726CD] flex items-center justify-center">
                    <Image src={'/dashboard/logo.svg'} alt={'home'} width={32} height={32} />
                </div>

                {/* Expand/Collapse Button */}
                <button
                    onClick={toggleSidebar}
                    className="h-16 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft
                        className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'
                            }`}
                    />
                </button>

                {/* Menu Items */}
                <nav className="flex-1 py-6 px-1 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 py-4 transition-colors relative group ${isOpen ? 'px-6' : 'px-4 justify-center'
                                    } ${isActive
                                        ? 'bg-[#E8E3FC] border-l-4 border-[#4726CD]'
                                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <div className={`flex-shrink-0 ${isActive ? 'icon-active' : 'icon-inactive'}`}>
                                    <Image src={Icon} alt={item.label} width={24} height={24} />
                                </div>
                                <span
                                    className={`font-normal text-base whitespace-nowrap transition-all duration-300 ${isActive ? 'text-[#4726CD]' : 'text-[#121524]'
                                        } ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                                        }`}
                                >
                                    {item.label}
                                </span>

                                {/* Tooltip for collapsed state */}
                                {!isOpen && (
                                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Menu;