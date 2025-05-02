"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { config } from "@/config";

const Verify = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = id;
  console.log(token);
  const handleVerification = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Email verified and account created successfully!");
        router.push("/login");
      } else {
        const error = await response.text();
        alert(`Error: ${error}. Failed to create.`);
        router.push("/login");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const stillValidToken = async () => {
    if (!token) return;
    const response = await fetch(
      `${config.apiBaseUrl}/auth/validRegisterToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (response.ok) {
      alert("Click a button.");
    } else {
      alert(await response.text());
      router.push("/users");
    }
  };

  useEffect(() => {
    stillValidToken();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Verify Email</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Please click the button below to verify and create your account.
          </p>
          <Button className="w-full" onClick={handleVerification}>
            Verify and Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
