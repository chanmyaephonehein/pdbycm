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
} from "@/components/ui/dialog"; //

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); // Tracks success dialog visibility
  const [countdown, setCountdown] = useState(0); // Countdown timer for reset link
  const [dialogInput, setDialogInput] = useState(""); // Stores input in the success dialog

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);

        setShowSuccessDialog(true); // Open success dialog
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handles sending the reset email
  const handleSendMail = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        alert("Password reset link has been sent to your email. Click OK!");
        setCountdown(60);
      } else {
        alert("Fill email input to reset!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
    localStorage.setItem("countdown", "60");
  };

  // Handles multi-factor authentication
  const confirmCode = async () => {
    if (dialogInput && email) {
      const response = await fetch(`http://localhost:3000/api/auth/twoFactor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialogInput, email: email }),
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
    }
  };

  // Initialize countdown from localStorage
  useEffect(() => {
    const cd = localStorage.getItem("countdown");
    setCountdown(Number(cd));
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      localStorage.setItem("countdown", `${countdown}`);
    }, 1000);

    return () => clearInterval(timer); // Clear the timer when the countdown reaches 0 or on component unmount
  }, [countdown]);

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
            >
              {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button onClick={handleLogin}>Login</Button>

          <p className="text-center text-sm">
            Forgot Password?{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Click Here
            </span>
          </p>
        </CardContent>
      </Card>
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
              <Button onClick={confirmCode}>Confirm</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
