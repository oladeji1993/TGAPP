"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface MenuProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

interface SubMenuItem {
    icon: string;
    label: string;
    href: string;
}

interface MenuItem {
    icon: string;
    label: string;
    href?: string;
    subItems?: SubMenuItem[];
    hasDropdown?: boolean;
}

const menuItems: MenuItem[] = [
    { icon: '/dashboard/home.svg', label: "Dashboard", href: "/dashboard" },
    { icon: '/dashboard/trans-checker.svg', label: "Trans. Status", href: "/dashboard/transactions" },
    {
        icon: '/dashboard/config.svg',
        label: "Configurations",
        subItems: [
            { icon: '/dashboard/banks.svg', label: "Banks", href: "/dashboard/banks" },
            { icon: '/dashboard/providers.svg', label: "Providers", href: "/dashboard/providers" },
            { icon: '/dashboard/routing.svg', label: "Routing Rules", href: "/dashboard/routing-rules" },
        ]
    },
    { icon: '/dashboard/channels.svg', label: "Channels", href: "/dashboard/channels" },
    { icon: '/dashboard/audit.svg', label: "Audit Logs", href: "/dashboard/audit-logs" },
    {
        icon: '/dashboard/settings.svg',
        label: "Settings",
        subItems: [
            { icon: '/dashboard/users.svg', label: "User Mgt", href: "/dashboard/user-management" },
            { icon: '/dashboard/limit.svg', label: "Limits", href: "/dashboard/limits" },
        ]
    },
];

const Menu = ({ isOpen, toggleSidebar }: MenuProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // Check if current path is within a submenu
    const isPathInSubMenu = (subItems?: SubMenuItem[]) => {
        if (!subItems) return false;
        return subItems.some(sub => pathname === sub.href);
    };

    // Find parent menu that contains current path
    const currentPathParent = menuItems.find(item => 
        item.subItems?.some(sub => pathname === sub.href)
    );

    // Auto-expand/collapse based on current path
    useEffect(() => {
        if (currentPathParent) {
            // If we're on a sub-item page, expand its parent
            setExpandedItems([currentPathParent.label]);
        } else {
            // If we're not on any sub-item page, collapse all
            setExpandedItems([]);
        }
    }, [pathname]);

    const handleParentClick = (item: MenuItem) => {
        if (item.subItems && item.subItems.length > 0) {
            const isCurrentlyExpanded = expandedItems.includes(item.label);
            
            if (isCurrentlyExpanded) {
                // Collapse if already expanded
                setExpandedItems([]);
            } else {
                // Expand and navigate to first sub-item
                setExpandedItems([item.label]);
                router.push(item.subItems[0].href);
            }
        }
    };

    return (
        <aside className={`fixed left-0 top-0 h-screen w-56 bg-[#F9F9F9] border-r border-[#D9D9D9] z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
            <div className="h-full flex flex-col">
                {/* Logo Section */}
                <div className="py-6 px-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/auth/black-logo.svg" alt="Sterling Logo" width={150} height={150} />
                    </div>
                    {/* Close button for mobile */}
                    <button 
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 hover:bg-gray-200 rounded"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isExpanded = expandedItems.includes(item.label);
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const hasActiveSubItem = isPathInSubMenu(item.subItems);
                        
                        // Parent is highlighted if expanded OR has active sub-item
                        const isParentHighlighted = isExpanded || hasActiveSubItem;
                        
                        // Regular menu item is active only if path matches AND we're not in any submenu
                        const isActive = item.href ? (pathname === item.href && !currentPathParent) : false;

                        return (
                            <div key={item.label}>
                                {/* Main Menu Item */}
                                {hasSubItems ? (
                                    <button
                                        onClick={() => handleParentClick(item)}
                                        className={`w-full flex items-center justify-between py-3 px-4 transition-colors ${
                                            isParentHighlighted
                                                ? 'bg-[#FDEEEE] border-l-4 border-l-[#F60E0E]'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image 
                                                src={item.icon} 
                                                alt={item.label} 
                                                width={18} 
                                                height={18}
                                                className={isParentHighlighted ? 'filter-red' : ''}
                                            />
                                            <span className={`text-sm ${isParentHighlighted ? 'text-[#F60E0E] font-medium' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 ${isParentHighlighted ? 'text-[#F60E0E]' : 'text-gray-400'} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href || '#'}
                                        className={`flex items-center justify-between py-3 px-4 transition-colors ${
                                            isActive
                                                ? 'bg-[#FDEEEE] border-l-4 border-l-[#F60E0E]'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image 
                                                src={item.icon} 
                                                alt={item.label} 
                                                width={18} 
                                                height={18}
                                                className={isActive ? 'filter-red' : ''}
                                            />
                                            <span className={`text-sm ${isActive ? 'text-[#F60E0E] font-medium' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {item.hasDropdown && (
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        )}
                                    </Link>
                                )}

                                {/* Sub Items */}
                                {hasSubItems && isExpanded && (
                                    <div className="mt-1 ml-3 pl-3 border-l border-gray-200 space-y-1">
                                        {item.subItems?.map((subItem) => {
                                            const isSubActive = pathname === subItem.href;
                                            return (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className={`flex items-center gap-3 py-2.5 px-4 transition-colors ${
                                                        isSubActive
                                                            ? 'bg-[#FDEEEE] border-l-4 border-l-[#F60E0E] text-[#F60E0E]'
                                                            : 'hover:bg-gray-50 text-gray-600'
                                                    }`}
                                                >
                                                    <Image 
                                                        src={subItem.icon} 
                                                        alt={subItem.label} 
                                                        width={16} 
                                                        height={16}
                                                        className={isSubActive ? 'filter-red' : ''}
                                                    />
                                                    <span className={`text-sm ${isSubActive ? 'font-medium' : ''}`}>
                                                        {subItem.label}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Menu;