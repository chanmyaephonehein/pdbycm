"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { config } from "@/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [dialogInput, setDialogInput] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);
        setShowSuccessDialog(true);
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    setIsLoggingIn(false);
  };

  const handleSendMail = async () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSendingReset(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Password reset link has been sent to your email. Click OK!");
        setCountdown(60);
      } else {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (error) {
      alert("Something went wrong.");
    }

    setIsSendingReset(false);
  };

  const confirmCode = async () => {
    if (!dialogInput || !email) return;

    setIsConfirming(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/twoFactor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialogInput, email }),
      });

      if (response.ok) {
        alert("Login Successful");
        const responseData = await response.json();
        const accessToken = responseData.token;
        localStorage.setItem("token", accessToken);
        router.push({ pathname: "/dashboard" });
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      alert("Failed to verify code.");
    }

    setIsConfirming(false);
  };

  useEffect(() => {
    setCountdown(0);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
      localStorage.setItem("countdown", `${countdown}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            ></button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button onClick={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm">
            Forgot Password?{" "}
            <span
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 underline cursor-pointer"
            >
              Click Here
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Two-Step Authentication</DialogTitle>
              <DialogDescription>
                Enter the code sent to your email to complete the login process:
              </DialogDescription>
            </DialogHeader>
            <Input
              type="number"
              value={dialogInput}
              onChange={(e) => setDialogInput(e.target.value)}
              placeholder="Enter code"
              className="mt-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="secondary"
                onClick={() => setShowSuccessDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmCode} disabled={isConfirming}>
                {isConfirming ? "Confirming..." : "Confirm"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Forgot Password Dialog */}
      {showForgotPassword && (
        <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email to receive a reset link.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              placeholder="Enter your email"
              className="mt-2"
            />
            {countdown === 0 ? (
              <Button
                className="w-full mt-4"
                onClick={handleSendMail}
                disabled={isSendingReset}
              >
                {isSendingReset ? "Sending..." : "Send Reset Link"}
              </Button>
            ) : (
              <p className="text-center text-sm text-blue-600 font-bold mt-4">
                Wait: {formatCountdown(countdown)}
              </p>
            )}
            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setShowForgotPassword(false)}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
