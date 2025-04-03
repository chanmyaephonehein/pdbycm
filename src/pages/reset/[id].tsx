"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const getPasswordStrength = (password: string): string => {
  if (password.length < 8) return "Poor";
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  const passed = [hasUpper, hasLower, hasDigit, hasSymbol].filter(
    Boolean
  ).length;

  if (passed === 4) return "Strong";
  if (passed >= 2) return "Moderate";
  return "Poor";
};

const getStrengthColor = (strength: string): string => {
  switch (strength) {
    case "Strong":
      return "bg-green-500";
    case "Moderate":
      return "bg-yellow-500";
    default:
      return "bg-red-500";
  }
};

const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = id;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("Poor");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const ifExpire = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3000/api/auth/expiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        alert(await res.text());
        router.push("/login");
      } else {
        alert("Reset your password.");
      }
    } catch (err) {
      alert("Error validating token.");
      router.push("/login");
    }
  };

  useEffect(() => {
    setStrength(getPasswordStrength(newPassword));
  }, [newPassword]);

  useEffect(() => {
    ifExpire();
  }, [token]);

  const handlePasswordReset = async () => {
    if (!token) return;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (confirmPassword.length < 8) {
      return alert("Password must be at least 8 characters long.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPw: newPassword }),
      });
      const message = await res.text();
      if (res.ok) {
        alert(message);
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        alert(message);
      }
    } catch {
      setError("Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex flex-col items-center">
            <CardTitle className="text-2xl mt-2">Reset Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* New Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            ></button>

            {/* Password Strength Bar */}
            <div className="mt-2 space-y-1">
              <div className="w-full h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getStrengthColor(strength)}`}
                  style={{
                    width:
                      strength === "Poor"
                        ? "33%"
                        : strength === "Moderate"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <p className="text-sm">
                Strength:{" "}
                <span
                  className={
                    strength === "Poor"
                      ? "text-red-500"
                      : strength === "Moderate"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }
                >
                  {strength}
                </span>
              </p>
              <p className="text-xs text-gray-600">
                Use at least 8 characters with uppercase, lowercase, number, and
                special character.
              </p>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            ></button>
          </div>

          <Button
            className="w-full"
            onClick={handlePasswordReset}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></span>
                Resetting...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
