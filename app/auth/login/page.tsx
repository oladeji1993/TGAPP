"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isFormValid = email.trim() !== "" && password.trim() !== "";
    const isOtpComplete = otp.every((digit) => digit !== "");

    useEffect(() => {
        // Focus first OTP input when modal opens
        if (showOtpModal) {
            inputRefs.current[0]?.focus();
        }
    }, [showOtpModal]);

    const handleLogin = () => {
        if (isFormValid) {
            // Show OTP modal instead of navigating
            setShowOtpModal(true);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
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

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleContinue = () => {
        if (isOtpComplete) {
            console.log("OTP:", otp.join(""));
            router.push("/dashboard");
        }
    };

    const handleCloseModal = () => {
        setShowOtpModal(false);
        setOtp(["", "", "", "", "", ""]);
    };

    return (
        <div 
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-8"
            style={{
                backgroundImage: "url('/auth/background.svg')",
                backgroundSize: 'cover'
            }}
        >
            <Card className="w-full shadow-2xl rounded-3xl overflow-hidden bg-white relative z-10" style={{ maxWidth: '480px' }}>
                {/* Top handle indicator */}
                <div className="pt-3 pb-2 flex justify-center">
                    <div className="w-16 h-1 bg-gray-300 rounded-full" />
                </div>
                
                {/* Purple Header */}
                <CardHeader className="bg-[#4726CD] text-white py-5 px-0">
                    <div className="flex items-center justify-center gap-3 px-0">
                        <Building2 className="w-10 h-10" strokeWidth={1.5} />
                        <div className="text-center">
                            <h1 className="text-xl font-bold leading-tight">
                                Bank Transactions
                            </h1>
                            <h2 className="text-xl font-bold leading-tight">
                                Gateway Portal
                            </h2>
                        </div>
                    </div>
                </CardHeader>

                {/* Form Content */}
                <CardContent className="px-10 py-6 space-y-5">
                    <div className="text-center space-y-1">
                        <h3 className="text-2xl font-bold text-[#4726CD]">
                            Welcome Back
                        </h3>
                        <p className="text-sm text-gray-700">
                            Enter your login credentials to continue.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 border-gray-300 text-sm px-4"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 border-gray-300 text-sm px-4 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                                >
                                    {showPassword ? (
                                        <Eye className="w-5 h-5" />
                                    ) : (
                                        <EyeOff className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button 
                            onClick={handleLogin}
                            disabled={!isFormValid}
                            className={`w-full h-12 font-semibold text-base mt-2 rounded-lg transition-colors ${
                                isFormValid 
                                    ? 'bg-[#4726CD] hover:bg-[#3818A0] text-white' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full shadow-2xl rounded-2xl overflow-hidden bg-white relative" style={{ maxWidth: '480px' }}>
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Content */}
                        <CardContent className="px-6 sm:px-10 py-8 sm:py-10">
                            <div className="space-y-6 sm:space-y-8">
                                {/* Header */}
                                <div className="text-center space-y-2 sm:space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-[#4726CD]">
                                        Authenticate Login
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-700">
                                        Enter your OneToken OTP to authenticate
                                    </p>
                                </div>

                                {/* OTP Inputs */}
                                <div className="space-y-3 sm:space-y-4">
                                    <label className="text-sm sm:text-base font-medium text-gray-900 block">
                                        OneToken OTP
                                    </label>
                                    <div className="flex gap-2 justify-start">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { inputRefs.current[index] = el; }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={index === 0 ? handleOtpPaste : undefined}
                                                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4726CD] focus:ring-2 focus:ring-[#4726CD]/20 transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <Button
                                    onClick={handleContinue}
                                    disabled={!isOtpComplete}
                                    className={`w-full h-12 sm:h-14 font-semibold text-base sm:text-lg rounded-lg sm:rounded-xl transition-colors mt-4 sm:mt-8 ${
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
            )}
        </div>
    );
};

export default Login;