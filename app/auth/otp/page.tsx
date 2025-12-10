"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Otp = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isOtpComplete = otp.every((digit) => digit !== "");

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        if (value.length > 1) return;

        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // Move to previous input if current is empty
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((digit, index) => {
            if (index < 6) {
                newOtp[index] = digit;
            }
        });
        setOtp(newOtp);

        // Focus last filled input or next empty
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleContinue = () => {
        if (isOtpComplete) {
            // Handle OTP submission
            console.log("OTP:", otp.join(""));
            // Navigate to dashboard or next page
            router.push("/dashboard");
        }
    };

    const handleClose = () => {
        router.back();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full shadow-2xl rounded-2xl overflow-hidden bg-white relative" style={{ maxWidth: '440px' }}>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <CardContent className="px-8 py-10">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-[#4726CD]">
                                Authenticate Login
                            </h2>
                            <p className="text-sm text-gray-700">
                                Enter your OneToken OTP to authenticate
                            </p>
                        </div>

                        {/* OTP Inputs */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-900">
                                OneToken OTP
                            </label>
                            <div className="flex gap-2 justify-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4726CD] focus:ring-2 focus:ring-[#4726CD]/20 transition-all"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Continue Button */}
                        <Button
                            onClick={handleContinue}
                            disabled={!isOtpComplete}
                            className={`w-full h-12 font-semibold text-base rounded-lg transition-colors ${
                                isOtpComplete
                                    ? 'bg-[#4726CD] hover:bg-[#3818A0] text-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Continue
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Otp;   