"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { useRouter } from "next/router";
import { Filter } from "lucide-react";

const statusOptions = [
  { label: "PENDING", value: "PENDING" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "RESOLVED", value: "RESOLVED" },
];

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  jobTitle: string;
  jobDetails: string;
  status: string;
  createdAt: string;
}

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | undefined>(
    undefined
  );
  const [tempFilterStatuses, setTempFilterStatuses] = useState<
    { label: string; value: string }[]
  >([]);
  const [tempFilterCountry, setTempFilterCountry] = useState<
    string | undefined
  >(undefined);
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  const router = useRouter();

  const fetchInquiries = async (searchTerm = "") => {
    try {
      let query = "";

      // If there's a search term, append it to the query
      if (searchTerm) {
        query = `?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(
        `http://localhost:3000/api/inquiries${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        alert("Failed to fetch inquiries");
        return;
      }

      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );

    try {
      const response = await fetch("http://localhost:3000/api/inquiries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) alert("Failed to update status");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearch = () => {
    // Update current search term and trigger search
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm);
      fetchInquiries(searchTerm);
    }
  };

  const handleReset = () => {
    // Reset search term and current search term
    setSearchTerm("");
    setCurrentSearchTerm("");

    // Fetch all inquiries
    fetchInquiries();
  };

  useEffect(() => {
    // Fetch all inquiries on initial load
    fetchInquiries("");
  }, []);

  const filteredInquiries = useMemo(() => {
    const now = Date.now();

    return inquiries.filter((inq) => {
      const createdAt = new Date(inq.createdAt).getTime();
      const isRecent = now - createdAt <= 3 * 60 * 60 * 1000; // last 3 hours

      // Search across multiple fields
      const matchesSearch =
        !currentSearchTerm ||
        inq.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        inq.companyName
          .toLowerCase()
          .includes(currentSearchTerm.toLowerCase()) ||
        inq.country.toLowerCase().includes(currentSearchTerm.toLowerCase());

      return (
        matchesSearch &&
        (filterStatuses.length === 0 || filterStatuses.includes(inq.status)) &&
        (!filterCountry || inq.country === filterCountry) &&
        (!showRecentOnly || isRecent)
      );
    });
  }, [
    inquiries,
    currentSearchTerm,
    filterStatuses,
    filterCountry,
    showRecentOnly,
  ]);

  const uniqueCountries = Array.from(
    new Set(inquiries.map((inq) => inq.country))
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex gap-2 w-full max-w-2xl">
          {" "}
          {/* Increased width */}
          <Input
            placeholder="Search by name, email, company, or country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow" // Make input take available space
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch} variant="outline">
            Search
          </Button>
          {/* Add a reset button */}
          {currentSearchTerm && (
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => {
              setTempFilterStatuses(
                filterStatuses.map((status) => ({
                  value: status,
                  label: status,
                }))
              );
              setTempFilterCountry(filterCountry);
              setIsFilterDialogOpen(true);
            }}
          >
            <Filter className="w-4 h-4 mr-2" /> Filter Options
          </Button>

          <Button
            variant={showRecentOnly ? "default" : "outline"}
            onClick={() => setShowRecentOnly((prev) => !prev)}
          >
            {showRecentOnly ? "Showing Recent" : "Recent (Last 3h)"}
          </Button>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogTitle>Filter Inquiries</DialogTitle>
          <div className="space-y-4">
            <div>
              <Label>Status (Multiple)</Label>
              <Select
                placeholder="All Status (Default)"
                isMulti
                options={statusOptions}
                value={tempFilterStatuses}
                onChange={(selected) => {
                  setTempFilterStatuses(selected);
                }}
                className="text-black"
              />
            </div>

            <div>
              <Label>Country</Label>
              <select
                value={tempFilterCountry ?? ""}
                onChange={(e) =>
                  setTempFilterCountry(e.target.value || undefined)
                }
                className="w-full border p-2 rounded text-black"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => {
                setFilterStatuses(tempFilterStatuses.map((s) => s.value));
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

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq, index) => (
                <TableRow key={inq.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{inq.name}</TableCell>
                  <TableCell>{inq.email}</TableCell>
                  <TableCell>{inq.country}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{inq.status}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status.value}
                            onClick={() =>
                              handleStatusChange(inq.id, status.value)
                            }
                          >
                            {status.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push({
                          pathname: `/inquiries/${inq.id}`,
                        })
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inquiries;
