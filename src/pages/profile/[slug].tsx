"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";
import countryList from "react-select-country-list";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  country: string;
};

// Decode token just to get ID and role
const decodeToken = (token: string): { id: number; role: string } | null => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [resetCountdown, setResetCountdown] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false); // <- NEW

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = decodeToken(token);
    if (!decoded?.id) return;
    console.log(decoded);

    if (decoded.role === "Staff") setIsStaff(true); // ← detect if staff

    fetch(`/api/users?id=${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setName(data.name);
        setRole(data.role);
        const matched = countryOptions.find((c) => c.label === data.country);
        setSelectedCountry(matched || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, [countryOptions]);

  useEffect(() => {
    if (resetCountdown <= 0) return;
    const timer = setInterval(() => {
      setResetCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resetCountdown]);

  const sendResetEmail = async () => {
    if (!user) return;
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });

    if (res.ok) {
      alert("Reset link sent to your email.");
      setResetCountdown(60);
    } else {
      const error = await res.json();
      alert(error.message || "Something went wrong.");
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    const updatedUser = {
      id: user.id,
      name,
      role,
      country: selectedCountry?.label || "",
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        const { user: updated, token } = await res.json();
        setUser(updated);
        setRole(updated.role);
        setName(updated.name);
        const matched = countryOptions.find((c) => c.label === updated.country);
        setSelectedCountry(matched || null);
        window.location.reload();

        // 🟡 Store the new token to reflect updated role
        if (token) {
          localStorage.setItem("token", token);
          alert("Profile updated and session refreshed.");
        } else {
          alert("Profile updated, but token refresh failed.");
        }
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!user) return <div className="p-6 text-red-500">User not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-3xl mb-4 flex justify-between items-center">
        <Button variant="secondary" onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>

      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarImage src="/sample.jpg" />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input disabled value={user.email} />
            </div>

            <div>
              <Label>Role</Label>
              {isStaff ? (
                <Input disabled value={role} />
              ) : (
                <UiSelect value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </UiSelect>
              )}
            </div>

            <div>
              <Label>Country</Label>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={(c) => setSelectedCountry(c)}
                className="text-black"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => setShowResetDialog(true)}
            >
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground pt-3">
        *Changes will only be saved if you click the save button. If you leave
        without saving, your updates will be lost.
      </p>

      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset Your Password</DialogTitle>
            <DialogDescription>
              A reset link will be sent to your email:{" "}
              <span className="font-medium">{user.email}</span>
            </DialogDescription>
          </DialogHeader>

          {resetCountdown === 0 ? (
            <Button className="w-full mt-4" onClick={sendResetEmail}>
              Send Reset Link
            </Button>
          ) : (
            <p className="text-center text-blue-600 font-semibold mt-4">
              Please wait {resetCountdown}s before trying again.
            </p>
          )}

          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => setShowResetDialog(false)}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
