"use client";

import React, { useState } from "react";

interface RuleData {
    id: number;
    paymentType: string;
    channel: string;
    maxAmountPerTrans: string;
    maxAmountPerDay: string;
    enabled: boolean;
}

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-[#22C55E]' : 'bg-gray-200'
            }`}
    >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
        />
    </button>
);

const TransactionRulesTab: React.FC = () => {
    const [rulesData, setRulesData] = useState<RuleData[]>([
        {
            id: 1,
            paymentType: "Transfer",
            channel: "All Channels",
            maxAmountPerTrans: "100,000,000,000",
            maxAmountPerDay: "100,000,000,000",
            enabled: true
        },
        {
            id: 2,
            paymentType: "Transfer",
            channel: "All Channels",
            maxAmountPerTrans: "100,000,000,000",
            maxAmountPerDay: "100,000,000,000",
            enabled: true
        },
        {
            id: 3,
            paymentType: "Transfer",
            channel: "All Channels",
            maxAmountPerTrans: "100,000,000,000",
            maxAmountPerDay: "100,000,000,000",
            enabled: true
        }
    ]);

    const handleToggleRule = (id: number) => {
        setRulesData(prev =>
            prev.map(rule =>
                rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
            )
        );
    };

    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-[#212529] mb-3 sm:mb-4">Transaction Rules</h3>

            <div className="space-y-4 max-h-150 overflow-y-auto">
                {rulesData.map((rule) => (
                    <div key={rule.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        {/* Rule Header */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <span className="text-xs text-gray-600">Payment Type</span>
                                <div className="text-sm font-medium text-gray-900">{rule.paymentType}</div>
                            </div>
                            <div>
                                <span className="text-xs text-gray-600">Channel</span>
                                <div className="text-sm font-medium text-gray-900">{rule.channel}</div>
                            </div>
                        </div>

                        {/* Rule Limits */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <span className="text-xs text-gray-600">Max amount / trans. / user</span>
                                <div className="text-sm font-medium text-gray-900">{rule.maxAmountPerTrans}</div>
                            </div>
                            <div>
                                <span className="text-xs text-gray-600">Max amount / day / user</span>
                                <div className="text-sm font-medium text-gray-900">{rule.maxAmountPerDay}</div>
                            </div>
                        </div>

                        {/* Rule Toggle */}
                        <div className="flex items-center gap-2">
                            <Toggle
                                checked={rule.enabled}
                                onChange={() => handleToggleRule(rule.id)}
                            />
                            <span className="text-xs text-gray-600">Enable/Disable rule</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// export default TransactionRulesTab;
// Delete
//                                         </button >
//                                     </div >
//                                 </>
//                             )}
//                         </div >
//                     </div >
//                 ))}
//             </div >
//         </div >
//     );
// };

export default TransactionRulesTab;
