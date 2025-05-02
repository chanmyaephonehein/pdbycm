"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";
import countryList from "react-select-country-list";
import { ArrowLeft, User, Trash2, Pencil } from "lucide-react";
import { config } from "@/config";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  country: string;
};

export default function UserDetailsPage() {
  const router = useRouter();
  const id = router.query.slug;

  const [user, setUser] = useState<User | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const fetchEachUser = async () => {
    const response = await fetch(`${config.apiBaseUrl}/users?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) return alert("No user found");
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    if (!id) return;
    fetchEachUser();
  }, [id]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
      const matchedCountry = countryOptions.find(
        (c) => c.label === user.country
      );
      setSelectedCountry(matchedCountry || null);
    }
  }, [user, countryOptions]);

  const handleEdit = async () => {
    const updatedUser = {
      id: user!.id,
      name,
      role,
      country: selectedCountry?.label || "",
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        setOpenEditDialog(false);
        setRole(user!.role);
        return alert("Cannot change role. At least one admin must remain.");
      }

      const result = await response.json();
      setUser(result.user);
      setOpenEditDialog(false);
      window.location.reload();
      alert("User updated successfully!");

      const token = localStorage.getItem("token");
      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.id === result.user.id && result.token) {
          localStorage.setItem("token", result.token);
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/users?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const message = await response.json();
      router.push("/users");
      alert(message.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  if (!user) return <div className="p-10">Loading user details...</div>;

  return (
    <div className="p-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/users")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex gap-2">
          <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit User</h3>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <UiSelect
                    value={role}
                    onValueChange={(value) => setRole(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </UiSelect>
                </div>
                <div>
                  <Label>Country</Label>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(selected) => setSelectedCountry(selected)}
                    placeholder="Select a country"
                    className="w-full text-black"
                  />
                </div>
                <Button className="mt-2 w-full" onClick={handleEdit}>
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md border space-y-6 max-w-xl">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5" /> User Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input disabled value={user.name} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input disabled value={user.email} />
          </div>
          <div>
            <Label>Role</Label>
            <Input disabled value={user.role} />
          </div>
          <div>
            <Label>Country</Label>
            <Input disabled value={user.country} />
          </div>
        </div>
      </div>
    </div>
  );
}
