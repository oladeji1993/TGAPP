"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PaymentProviders from "./PaymentProviders";
import VASProviders from "./VASProviders";
import AddPaymentProviderModal from "./modals/AddPaymentProviderModal";
import TransactionRulesModal from "./modals/TransactionRulesModal";
import PreviewAndCreateModal from "./modals/PreviewAndCreateModal";

const ProvidersPage = () => {
    const [activeTab, setActiveTab] = useState<'payment' | 'vas'>('payment');
    const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
    const [isTransactionRulesModalOpen, setIsTransactionRulesModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [providerFormData, setProviderFormData] = useState<any>(null);
    const [transactionRulesData, setTransactionRulesData] = useState<any[]>([]);

    const handleAddProvider = () => {
        setIsAddProviderModalOpen(true);
    };

    const handleNextStep = (formData: any, paymentTypes: any[]) => {
        setProviderFormData({ formData, paymentTypes });
        setIsAddProviderModalOpen(false);
        setIsTransactionRulesModalOpen(true);
    };

    const handleTransactionRulesNext = (transactionRules: any[]) => {
        setTransactionRulesData(transactionRules);
        setIsTransactionRulesModalOpen(false);
        setIsPreviewModalOpen(true);
    };

    const handleGoBackToProvider = () => {
        setIsTransactionRulesModalOpen(false);
        setIsAddProviderModalOpen(true);
    };

    const handleGoBackToRules = () => {
        setIsPreviewModalOpen(false);
        setIsTransactionRulesModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddProviderModalOpen(false);
        setIsTransactionRulesModalOpen(false);
        setIsPreviewModalOpen(false);
        setProviderFormData(null);
        setTransactionRulesData([]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">{activeTab === 'payment' ? 'Payment Providers' : 'VAS Providers'}</h1>
                <button
                    onClick={handleAddProvider}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <span>{activeTab === 'payment' ? 'New Payment Provider' : 'New VAS Provider'}</span>
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="inline-flex items-center bg-[#F0F0F0] rounded-lg p-1">
                <button
                    onClick={() => setActiveTab('payment')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'payment'
                        ? 'bg-[#F60E0E] text-white'
                        : 'text-gray-700'
                        }`}
                >
                    Payment Providers
                </button>
                <button
                    onClick={() => setActiveTab('vas')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'vas'
                        ? 'bg-[#F60E0E] text-white'
                        : 'text-gray-700'
                        }`}
                >
                    VAS Providers
                </button>
            </div>

            {/* Dynamic Content */}
            {activeTab === 'payment' ? <PaymentProviders /> : <VASProviders />}

            {/* Add Provider Modal - Only show for payment providers for now */}
            {activeTab === 'payment' && (
                <>
                    <AddPaymentProviderModal
                        isOpen={isAddProviderModalOpen}
                        onClose={handleCloseModal}
                        onNextStep={handleNextStep}
                    />
                    <TransactionRulesModal
                        isOpen={isTransactionRulesModalOpen}
                        onClose={handleCloseModal}
                        onGoBack={handleGoBackToProvider}
                        onContinue={handleTransactionRulesNext}
                    />
                    <PreviewAndCreateModal
                        isOpen={isPreviewModalOpen}
                        onClose={handleCloseModal}
                        onGoBack={handleGoBackToRules}
                        providerData={providerFormData?.formData}
                        paymentTypes={providerFormData?.paymentTypes || []}
                        transactionRules={transactionRulesData}
                    />
                </>
            )}
        </div>
    );
};

export default ProvidersPage;
