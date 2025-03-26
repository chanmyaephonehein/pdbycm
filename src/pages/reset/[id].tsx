"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // ✅ CORRECT for Pages Router
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { EyeIcon, EyeOffIcon } from "lucide-react";
// import LoadingOverlay from "@/components/loading-overlay"; // Adjust to your structure

const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = id;
  console.log(token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({
    score: 0,
    message: "",
    colorClass: "",
  });
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [num, setNum] = useState(false);
  const [sym, setSym] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const evaluatePasswordStrength = (pw: string) => {
    const upperCriteria = /[A-Z]/.test(pw);
    const lowerCriteria = /[a-z]/.test(pw);
    const numberCriteria = /[0-9]/.test(pw);
    const symbolCriteria = /[@$!%*?&#]/.test(pw);

    setUpper(upperCriteria);
    setLower(lowerCriteria);
    setNum(numberCriteria);
    setSym(symbolCriteria);
    setCharCount(pw.length);

    let score = 0;
    if (pw.length < 5) score = 0;
    else if (pw.length < 7) score = 1;
    else {
      score = 1;
      if (upperCriteria) score++;
      if (lowerCriteria) score++;
      if (numberCriteria) score++;
      if (symbolCriteria) score++;
    }
    if (pw.length >= 12) score += 1;

    let message = "";
    let colorClass = "";
    switch (score) {
      case 0:
        message = "Very Weak";
        colorClass = "text-red-500";
        break;
      case 1:
        message = "Weak";
        colorClass = "text-orange-500";
        break;
      case 2:
      case 3:
      case 4:
        message = "Moderate";
        colorClass = "text-yellow-500";
        break;
      case 5:
        message = "Strong";
        colorClass = "text-blue-500";
        break;
      case 6:
        message = "Very Strong";
        colorClass = "text-green-500";
        break;
      default:
        message = "Try again";
        colorClass = "text-red-500";
    }
    return { score, message, colorClass };
  };

  const ifExpire = async () => {
    if (!token) return;
    console.log("leepl");
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
    setStrength(evaluatePasswordStrength(newPassword));
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
    // setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPw: newPassword }),
      });
      const message = await res.text();
      if (res.ok) {
        console.log("COmplete");
        alert(message);
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        alert(message);
      }
    } catch {
      setError("Failed to reset password. Please try again.");
    }
    // setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      {/* {loading && <LoadingOverlay />} */}
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex flex-col items-center">
            <CardTitle className="text-2xl mt-2">Reset Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* New Password Input */}
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
            >
              {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
            </button>
          </div>

          {/* Confirm Password Input */}
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
            >
              {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
            </button>
          </div>

          {charCount > 0 && (
            <div className="text-center space-y-1">
              <p className={`font-semibold text-lg ${strength.colorClass}`}>
                {strength.message}
              </p>
              <p className="text-sm">{charCount} characters containing:</p>
              <div className="flex justify-center gap-4 text-sm">
                <span className={lower ? "text-green-500" : "text-gray-500"}>
                  Lowercase
                </span>
                <span className={upper ? "text-green-500" : "text-gray-500"}>
                  Uppercase
                </span>
                <span className={num ? "text-green-500" : "text-gray-500"}>
                  Number
                </span>
                <span className={sym ? "text-green-500" : "text-gray-500"}>
                  Symbol
                </span>
              </div>
            </div>
          )}

          <Button className="w-full" onClick={handlePasswordReset}>
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
