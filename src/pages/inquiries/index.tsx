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
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  subHours,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { config } from "@/config";

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
  const [timeFilter, setTimeFilter] = useState("all");

  const router = useRouter();

  const fetchInquiries = async (searchTerm = "") => {
    try {
      let query = "";
      if (searchTerm) {
        query = `?search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(`${config.apiBaseUrl}/inquiries${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      const response = await fetch(`${config.apiBaseUrl}/inquiries`, {
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
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm);
      fetchInquiries(searchTerm);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentSearchTerm("");
    fetchInquiries();
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Country",
      "Company",
      "Job Title",
      "Job Details",
      "Status",
      "Created At",
    ];

    const rows = filteredInquiries.map((inq) => [
      inq.id,
      inq.name,
      inq.email,
      inq.phone,
      inq.country,
      inq.companyName,
      inq.jobTitle,
      inq.jobDetails,
      inq.status,
      new Date(inq.createdAt).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inquiries_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchInquiries("");
  }, []);

  const filteredInquiries = useMemo(() => {
    const now = new Date();

    return inquiries
      .filter((inq) => {
        const created = new Date(inq.createdAt);

        const matchesTimeFilter =
          timeFilter === "all" ||
          (timeFilter === "3h" && created >= subHours(now, 3)) ||
          (timeFilter === "today" &&
            created >= startOfDay(now) &&
            created <= endOfDay(now)) ||
          (timeFilter === "week" && created >= startOfWeek(now)) ||
          (timeFilter === "month" && created >= startOfMonth(now));

        const matchesSearch =
          !currentSearchTerm ||
          inq.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
          inq.email.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
          inq.companyName
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase()) ||
          inq.country.toLowerCase().includes(currentSearchTerm.toLowerCase());

        return (
          matchesTimeFilter &&
          matchesSearch &&
          (filterStatuses.length === 0 ||
            filterStatuses.includes(inq.status)) &&
          (!filterCountry || inq.country === filterCountry)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ); // sort by newest
  }, [inquiries, currentSearchTerm, filterStatuses, filterCountry, timeFilter]);

  const uniqueCountries = Array.from(
    new Set(inquiries.map((inq) => inq.country))
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex gap-2 w-full max-w-2xl">
          <Input
            placeholder="Search by name, email, company, or country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button onClick={handleSearch} variant="outline">
            Search
          </Button>
          {currentSearchTerm && (
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleExportCSV}>
            Export CSV
          </Button>

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
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All</option>
            <option value="3h">Recent (3h)</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

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
                onChange={(selected) => setTempFilterStatuses(selected)}
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
      <p className="text-sm text-muted-foreground mb-2">
        Showing inquiries sorted by newest time — latest ones appear at the top.
      </p>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Date & Time</TableHead>
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
                    {new Date(inq.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
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
                        router.push({ pathname: `/inquiries/${inq.id}` })
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
