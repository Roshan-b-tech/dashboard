"use client";

import { useState, useMemo } from "react";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, Search, Download, Filter, Calendar } from "lucide-react";
import { TableData } from "@/types/dashboard";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DataTableProps {
  data: TableData[];
  title?: string;
  description?: string;
}

export function DataTable({ data, title, description }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TableData>("revenue");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Date range state
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }>({
    startDate: null,
    endDate: null,
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateActive, setDateActive] = useState(false);

  // Collect all dates with data (ISO strings)
  const dataDates = useMemo(() => new Set(data.map(row => row.date)), [data]);

  // Filter data by date range
  const filteredData = useMemo(() => {
    if (!dateActive || !dateRange.startDate || !dateRange.endDate) return data;
    return data.filter(row => {
      const rowDate = parseISO(row.date);
      return isWithinInterval(rowDate, { start: dateRange.startDate!, end: dateRange.endDate! });
    });
  }, [data, dateRange, dateActive]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = filteredData.filter(item => {
      const matchesSearch = item.campaign.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [filteredData, searchTerm, sortField, sortDirection, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-accent/10 text-accent",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      completed: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border-0 text-accent`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const csv = [
      Object.keys(filteredAndSortedData[0]).join(','),
      ...filteredAndSortedData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign-data.csv';
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Campaign", "Revenue", "Users", "Conversions", "CTR", "Status"]],
      body: filteredAndSortedData.map(row => [
        row.campaign,
        `$${row.revenue.toLocaleString()}`,
        row.users.toLocaleString(),
        row.conversions,
        `${row.ctr}%`,
        row.status.charAt(0).toUpperCase() + row.status.slice(1)
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [246, 76, 103] },
      margin: { top: 20 },
    });
    doc.save("campaign-data.pdf");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-between">
            <div>
              {title && <CardTitle className="text-lg text-accent">{title}</CardTitle>}
              {description && <CardDescription className="text-accent">{description}</CardDescription>}
            </div>
            {/* Actions: Search, Filter, Date Range, Export */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              {/* Date Range Picker */}
              <div className="relative">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-accent bg-background hover:bg-accent/10 transition-colors"
                  onClick={() => setShowDatePicker(v => !v)}
                  title="Select date range"
                  aria-label="Select date range"
                >
                  <Calendar className="h-5 w-5 text-accent" />
                </button>
                {showDatePicker && (
                  <div className="absolute z-50 mt-2 left-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-border p-2 w-80 max-w-[90vw]">
                    <DateRange
                      ranges={[{
                        startDate: dateRange.startDate || new Date(),
                        endDate: dateRange.endDate || new Date(),
                        key: 'selection',
                      }]}
                      onChange={(item: any) => {
                        setDateRange(item.selection);
                        setDateActive(true);
                        setShowDatePicker(false); // Close popup after selection
                      }}
                      maxDate={new Date()}
                      showDateDisplay={false}
                      rangeColors={["#F64C67"]}
                      dayContentRenderer={(date: Date) => {
                        const iso = date.toISOString().slice(0, 10);
                        return (
                          <div style={{ position: 'relative' }}>
                            {date.getDate()}
                            {dataDates.has(iso) && (
                              <span
                                style={{
                                  position: 'absolute',
                                  bottom: 2,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  background: '#F64C67',
                                  display: 'inline-block',
                                }}
                              />
                            )}
                          </div>
                        );
                      }}
                    />
                    <button
                      className="mt-2 w-full py-2 rounded bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/80 transition"
                      onClick={() => {
                        setDateRange({ startDate: null, endDate: null, key: 'selection' });
                        setDateActive(false);
                        setShowDatePicker(false);
                      }}
                    >
                      Clear Date Filter
                    </button>
                  </div>
                )}
              </div>
              <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/80 whitespace-nowrap">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={exportToPDF} variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                <Download className="h-4 w-4 rotate-90" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table for desktop, stacked cards for mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('campaign')}
                      className="gap-1 h-auto p-0 font-medium"
                    >
                      Campaign
                      {sortField === 'campaign' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </th>
                  <th className="text-left p-3 font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('revenue')}
                      className="gap-1 h-auto p-0 font-medium"
                    >
                      Revenue
                      {sortField === 'revenue' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </th>
                  <th className="text-left p-3 font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('users')}
                      className="gap-1 h-auto p-0 font-medium"
                    >
                      Users
                      {sortField === 'users' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </th>
                  <th className="text-left p-3 font-medium">Conversions</th>
                  <th className="text-left p-3 font-medium">CTR</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3 font-medium">{row.campaign}</td>
                    <td className="p-3">${row.revenue.toLocaleString()}</td>
                    <td className="p-3">{row.users.toLocaleString()}</td>
                    <td className="p-3">{row.conversions}</td>
                    <td className="p-3">{row.ctr}%</td>
                    <td className="p-3">{getStatusBadge(row.status)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-4">
            {paginatedData.map((row, index) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-lg border bg-card p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">Campaign</span>
                  <span className="font-medium">{row.campaign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">Revenue</span>
                  <span>${row.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">Users</span>
                  <span>{row.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">Conversions</span>
                  <span>{row.conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">CTR</span>
                  <span>{row.ctr}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(row.status)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2 md:gap-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="min-w-[2.5rem] px-2 text-xs"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0 text-xs"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="min-w-[2.5rem] px-2 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div >
  );
}