"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Eye, EyeOff, Filter } from "lucide-react";
import Select from "react-select";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import countryList from "react-select-country-list";
import { useRouter } from "next/navigation";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  country: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);
  const [filterCountry, setFilterCountry] = useState<string | undefined>(
    undefined
  );
  const [tempFilterRole, setTempFilterRole] = useState<string | undefined>(
    undefined
  );
  const [tempFilterCountry, setTempFilterCountry] = useState<
    string | undefined
  >(undefined);

  // Enhanced search states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const router = useRouter();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    country: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const fetchUsers = async (searchTerm = "") => {
    try {
      let query = "";

      // If there's a search term, append it to the query
      if (searchTerm) {
        query = `?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(`http://localhost:3000/api/users${query}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error fetching users. Please try again.");
        return;
      }

      if (data.length === 0) {
        alert("No users found for the search criteria.");
      } else {
        setUsers(data.slice(0, 100)); // Limit the data for performance
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.role ||
      !newUser.country
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const message = await response.json();

    if (!response.ok) return alert(message.message);

    alert(message.message);
    setIsDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      country: "",
    });
    setSelectedCountry(null);
  };

  // Enhanced search functionality
  const handleSearch = () => {
    // Update current search term and trigger search
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm);
      fetchUsers(searchTerm);
    }
  };

  const handleReset = () => {
    // Reset search term and current search term
    setSearchTerm("");
    setCurrentSearchTerm("");

    // Fetch all users
    fetchUsers();
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (!filterRole || user.role === filterRole) &&
        (!filterCountry || user.country === filterCountry) &&
        (!currentSearchTerm ||
          user.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
          user.country.toLowerCase().includes(currentSearchTerm.toLowerCase()))
    );
  }, [users, filterRole, filterCountry, currentSearchTerm]);

  const columns: ColumnDef<User>[] = [
    { accessorKey: "id", header: "No.", cell: ({ row }) => row.index + 1 },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "country", header: "Country" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => router.push(`/users/${row.original.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const roleOptions = Array.from(new Set(users.map((u) => u.role)));
  const countryOptions = Array.from(new Set(users.map((u) => u.country)));

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex gap-2 w-full max-w-2xl">
          <Input
            placeholder="Search by name, email, role, or country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <Button onClick={handleSearch} variant="outline">
            Search
          </Button>

          {/* Reset button appears after search */}
          {currentSearchTerm && (
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant="outline"
            onClick={() => {
              setTempFilterRole(filterRole);
              setTempFilterCountry(filterCountry);
              setIsFilterDialogOpen(true);
            }}
          >
            <Filter className="w-4 h-4 mr-2" /> Filter Options
          </Button>

          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            + Add User
          </Button>
        </div>
      </div>

      {/* Rest of the component remains the same (Dialogs, Table, etc.) */}
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogTitle>Filter Users</DialogTitle>
          <div className="space-y-4">
            <div>
              <Label>Role</Label>
              <UiSelect
                value={tempFilterRole ?? "__all__"}
                onValueChange={(val) =>
                  setTempFilterRole(val === "__all__" ? undefined : val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All</SelectItem>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </UiSelect>
            </div>
            <div>
              <Label>Country</Label>
              <UiSelect
                value={tempFilterCountry ?? "__all__"}
                onValueChange={(val) =>
                  setTempFilterCountry(val === "__all__" ? undefined : val)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All</SelectItem>
                  {countryOptions.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </UiSelect>
            </div>
            <Button
              onClick={() => {
                setFilterRole(tempFilterRole);
                setFilterCountry(tempFilterCountry);
                setIsFilterDialogOpen(false);
              }}
              className="mt-2"
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Add New User</DialogTitle>
          <Input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Re-enter Password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {passwordMismatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          <UiSelect
            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </UiSelect>
          <Label>Country</Label>
          <Select
            options={countryList().getData()} // ✅ Dynamically loads all countries
            value={selectedCountry}
            onChange={(selected) => {
              setSelectedCountry(selected);
              setNewUser({ ...newUser, country: selected?.label || "" }); // ✅ Correctly updates the country
            }}
            placeholder="Select a country"
            className="w-full text-black"
          />
          <Button onClick={handleCreateUser}>Create</Button>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
