"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Side - Background Image with Branding */}
            <div
                className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/auth/left-bg.svg')",
                }}
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Branding Content */}
                <div className="relative z-10 flex flex-col justify-center px-8 lg:px-12 xl:px-20 2xl:px-24">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/auth/logo.svg" alt="Sterling Logo" width={150} height={150} />
                    </div>

                    {/* Title */}
                    <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
                        Payment-Hub
                    </h1>
                    <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
                        Admin
                    </h2>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div
                className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen lg:min-h-0 p-4 sm:p-6 md:p-8"
                style={{
                    backgroundImage: "url('/auth/right-bg.svg')",
                }}
            >
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 py-8 sm:py-12">
                    {/* Mobile Logo - Only visible on small screens */}
                    <div className="flex lg:hidden items-center gap-3 mb-8 sm:mb-10 justify-center">
                        <Image src="/auth/black-logo.svg" alt="Sterling Logo" width={120} height={120} />
                    </div>

                    {/* Form Card */}
                    <Card className="bg-white shadow-lg rounded-2xl sm:rounded-3xl border-0">
                        <CardContent className="p-6 sm:p-8 lg:p-10">
                            {/* Header */}
                            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                                    Welcome Back
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                                    Enter your login credentials to continue.
                                </p>
                            </div>

                            <div className="space-y-5 sm:space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2 sm:space-y-3">
                                    <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700">
                                        Email or username
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="user.email@sterling.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 sm:h-14 border-gray-300 text-sm sm:text-base px-4 rounded-xl"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2 sm:space-y-3">
                                    <Label htmlFor="password" className="text-sm sm:text-base font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 sm:h-14 border-gray-300 text-sm sm:text-base px-4 pr-12 rounded-xl"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <Button
                                    onClick={handleLogin}
                                    disabled={!isFormValid}
                                    className={`w-full h-12 sm:h-14 font-semibold text-base sm:text-lg mt-4 sm:mt-6 rounded-xl transition-colors ${isFormValid
                                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Login
                                </Button>
                            </div>

                            {/* Footer */}
                            <div className="pt-6 sm:pt-8 text-center">
                                <p className="text-sm sm:text-base text-gray-500">
                                    Powered by <span className="font-medium">Sterling</span> HoldCo.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md shadow-xl rounded-3xl bg-white relative mx-auto">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-900 hover:text-gray-700 transition-colors z-10"
                        >
                            <X className="w-6 h-6" strokeWidth={2.5} />
                        </button>

                        {/* Content */}
                        <CardContent className="px-6 sm:px-10 py-8 sm:py-10">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="space-y-2">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        Authenticate Login
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Enter your OneToken OTP to authenticate
                                    </p>
                                </div>

                                {/* OTP Inputs */}
                                <div className="space-y-3">
                                    <label className="text-sm sm:text-base font-medium text-gray-900 block">
                                        OneToken OTP
                                    </label>
                                    <div className="grid grid-cols-6 gap-2 sm:gap-3">
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
                                                className="w-full aspect-square text-center text-lg sm:text-xl font-semibold bg-gray-100 border-b-2 border-gray-400 rounded-lg focus:outline-none focus:border-gray-900 focus:bg-gray-50 transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Login Button */}
                                <Button
                                    onClick={handleContinue}
                                    disabled={!isOtpComplete}
                                    className={`w-full h-12 sm:h-14 font-semibold text-base sm:text-lg rounded-xl transition-colors mt-4 ${isOtpComplete
                                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Login
                                </Button>

                                {/* Footer */}
                                <div className="pt-2 text-center">
                                    <p className="text-sm text-gray-500">
                                        Powered by <span className="font-medium">Sterling</span> HoldCo.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Login;