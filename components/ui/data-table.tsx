"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search, ChevronDown, Calendar, RefreshCw, Download } from "lucide-react";

// Column definition type
export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
}

// Filter option type
export interface FilterOption {
    label: string;
    value: string;
}

// Filter definition type
export interface Filter {
    key: string;
    label: string;
    options: FilterOption[];
}

// Table props
export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    filters?: Filter[];
    searchPlaceholder?: string;
    showSearch?: boolean;
    showDateFilter?: boolean;
    showExport?: boolean;
    showRefresh?: boolean;
    onRefresh?: () => void;
    onExport?: () => void;
    onRowClick?: (item: T) => void;
    rowActions?: (item: T) => React.ReactNode;
    pageSize?: number;
    selectable?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
    data,
    columns,
    filters = [],
    searchPlaceholder = "Search...",
    showSearch = true,
    showDateFilter = true,
    showExport = true,
    showRefresh = true,
    onRefresh,
    onExport,
    onRowClick,
    rowActions,
    pageSize = 10,
    selectable = true,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Filter and search data
    const filteredData = data.filter((item) => {
        // Search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = columns.some((col) => {
                const value = getNestedValue(item, col.key as string);
                return value?.toString().toLowerCase().includes(searchLower);
            });
            if (!matchesSearch) return false;
        }
        return true;
    });

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    // Helper to get nested values
    function getNestedValue(obj: T, path: string): unknown {
        return path.split('.').reduce((acc: unknown, part) => {
            if (acc && typeof acc === 'object') {
                return (acc as Record<string, unknown>)[part];
            }
            return undefined;
        }, obj);
    }

    // Select all handler
    const handleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
        } else {
            const newSelected = new Set<string | number>();
            paginatedData.forEach((item, index) => {
                newSelected.add(item.id ?? index);
            });
            setSelectedRows(newSelected);
        }
    };

    // Select row handler
    const handleSelectRow = (id: string | number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    return (
        <div className="w-full">
            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
                {/* Search */}
                {showSearch && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                )}

                {/* Dynamic Filters */}
                {filters.map((filter) => (
                    <div key={filter.key} className="relative">
                        <select
                            value={filterValues[filter.key] || ""}
                            onChange={(e) => setFilterValues({ ...filterValues, [filter.key]: e.target.value })}
                            className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                        >
                            <option value="">{filter.label}</option>
                            {filter.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                ))}

                {/* Date Filters */}
                {showDateFilter && (
                    <>
                        <div className="relative">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                placeholder="From Date"
                                className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder="To Date"
                                className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </>
                )}

                {/* Refresh Button */}
                {showRefresh && (
                    <button
                        onClick={onRefresh}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                )}

                {/* Export Button */}
                {showExport && (
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Export
                        <Download className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="border-t border-b border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F5F5] border-b border-gray-200">
                            <tr>
                                {selectable && (
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300"
                                        />
                                    </th>
                                )}
                                {columns.map((column) => (
                                    <th
                                        key={column.key as string}
                                        className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                                        style={{ width: column.width }}
                                    >
                                        <div className="flex items-center gap-1">
                                            {column.header}
                                            {column.sortable && (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {rowActions && (
                                    <th className="w-16 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        More
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                                        className="px-4 py-12 text-center text-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => {
                                    const rowId = item.id ?? index;
                                    const isEvenRow = index % 2 === 1;
                                    return (
                                        <tr
                                            key={rowId}
                                            className={`border-b border-gray-100 transition-colors ${
                                                isEvenRow ? 'bg-[#F9F9F9]' : 'bg-white'
                                            } hover:bg-gray-100 ${
                                                onRowClick ? "cursor-pointer" : ""
                                            }`}
                                            onClick={() => onRowClick?.(item)}
                                        >
                                            {selectable && (
                                                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.has(rowId)}
                                                        onChange={() => handleSelectRow(rowId)}
                                                        className="w-4 h-4 rounded border-gray-300"
                                                    />
                                                </td>
                                            )}
                                            {columns.map((column) => (
                                                <td
                                                    key={column.key as string}
                                                    className="px-4 py-3 text-sm text-gray-600"
                                                >
                                                    {column.render
                                                        ? column.render(item)
                                                        : (getNestedValue(item, column.key as string) as React.ReactNode)}
                                                </td>
                                            ))}
                                            {rowActions && (
                                                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                                    {rowActions(item)}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-600">
                    <span>
                        Showing page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default DataTable;
