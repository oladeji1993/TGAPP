import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import Image from "next/image";

interface Transaction {
    id: number;
    sessionId: string;
    transDate: string;
    channel: string;
    paymentType: string;
    amount: string;
    provider: string;
    status: string;
}

interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

interface TransactionJourneyStep {
    title: string;
    timestamp: string;
    status: 'completed' | 'failed';
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
    isOpen,
    onClose,
    transaction
}) => {
    if (!isOpen || !transaction) return null;

    // Sample transaction journey data - in real app, this would come from API
    const transactionJourney: TransactionJourneyStep[] = [
        {
            title: "Request received from channel",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        },
        {
            title: "Request validated",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        },
        {
            title: "Customer account debited",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        },
        {
            title: "Fraud check (Allowed)",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        },
        {
            title: "NIP provider attempted (Failed)",
            timestamp: "12/12/2025 - 12:00PM",
            status: "failed"
        },
        {
            title: "NIP provider attempted (Successful)",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        },
        {
            title: "Transaction completed",
            timestamp: "12/12/2025 - 12:00PM",
            status: "completed"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Successful": return "text-[#27920B]";
            case "Pending": return "text-[#F59E0B]";
            case "Reversed": return "text-[#F97316]";
            case "Failed": return "text-[#EF4444]";
            default: return "text-gray-600";
        }
    };

    // Format amount to match design
    const formatAmount = (amount: string) => {
        return amount.replace('N000,000,000.00', '₦ 100,000.00');
    };

    // Generate sample account/bank data
    const getTransactionDetails = () => ({
        fromAccount: "0023456324",
        fromBank: "STERLING BANK",
        toAccount: "0023456324",
        toBank: "FIRST BANK",
        statusCode: "X1046",
        statusDescription: "Transfer Successful"
    });

    const details = getTransactionDetails();

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 w-screen h-screen bg-black/30 z-9999 transition-all duration-300 ease-out"
            />

            {/* Side Modal */}
            <div
                className={`fixed top-0 h-full bg-white z-10000 shadow-2xl transition-all duration-300 ease-out 
                    ${isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    right-0 w-full sm:w-[532px] max-w-full flex flex-col`}
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 shrink-0">
                    <div className="flex justify-between gap-2 sm:gap-4 w-full">
                        <div className="flex items-center bg-[#FEEBEB] rounded-b-sm flex-1 p-1.5 gap-2">
                            <Image src="/dashboard/info.svg" alt="Info" width={20} height={20} />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                Transaction Information
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 bg-[#F0F0F0] hover:bg-gray-100 rounded shrink-0">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                        {/* Transaction Details Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>

                            <div className="space-y-4">
                                {/* Session/Reference ID */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Session/Reference ID</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{transaction.sessionId.replace('...', '2969...')}</span>
                                </div>

                                {/* Transaction Date & Time */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Transaction Date & Time</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{transaction.transDate}</span>
                                </div>

                                {/* Channel */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Channel</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{transaction.channel}</span>
                                </div>

                                {/* Payment Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Payment Type</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{transaction.paymentType}</span>
                                </div>

                                {/* Amount */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Amount</span>
                                    <span className="text-sm text-gray-900 font-semibold sm:col-span-2">{formatAmount(transaction.amount)}</span>
                                </div>

                                {/* Provider */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Provider</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{transaction.provider}</span>
                                </div>

                                {/* From Account */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">From Account</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.fromAccount}</span>
                                </div>

                                {/* From Bank */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">From Bank</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.fromBank}</span>
                                </div>

                                {/* To Account */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">To Account</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.toAccount}</span>
                                </div>

                                {/* To Bank */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">To Bank</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.toBank}</span>
                                </div>

                                {/* Status */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Status</span>
                                    <span className={`text-sm font-medium sm:col-span-2 ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </div>

                                {/* Status Code */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Status Code</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.statusCode}</span>
                                </div>

                                {/* Status Description */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2">
                                    <span className="text-sm text-gray-600 font-medium">Status Description</span>
                                    <span className="text-sm text-gray-900 sm:col-span-2">{details.statusDescription}</span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Journey Section */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Journey</h3>

                            <div className="space-y-4">
                                {transactionJourney.map((step, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <CheckCircle
                                                className={`w-5 h-5 ${step.status === 'completed'
                                                        ? 'text-[#27920B]'
                                                        : 'text-[#EF4444]'
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {step.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {step.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionDetailsModal;