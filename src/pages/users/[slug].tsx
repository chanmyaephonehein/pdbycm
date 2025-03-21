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
    const response = await fetch(`http://localhost:3000/api/users?id=${id}`);
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

  if (!user) return <p>Loading user details...</p>;

  const handleEdit = async () => {
    const updatedUser = {
      id: user.id,
      name,
      role,
      country: selectedCountry?.label || "",
    };

    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        return alert("Failed to update user");
      }

      const result = await response.json();
      setUser(result);
      setOpenEditDialog(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/users?id=${id}`, {
        method: "DELETE",
      });
      router.push("/users");
      alert("User Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management Detail</h2>

      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/user-management")}
        >
          Back
        </Button>
      </div>

      <div className="border p-4 w-[400px]">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email Address:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-semibold mb-2">Edit User</h3>
            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
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
              <Button onClick={handleEdit} className="mt-2">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-semibold">Confirm Delete</h3>
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
  );
}
