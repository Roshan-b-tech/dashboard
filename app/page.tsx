"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { LineChartCard } from "@/components/dashboard/charts/line-chart";
import { BarChartCard } from "@/components/dashboard/charts/bar-chart";
import { DonutChartCard } from "@/components/dashboard/charts/donut-chart";
import { DataTable } from "@/components/dashboard/data-table";
import { MetricCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/dashboard/loading-skeleton";
import {
  mockMetrics,
  mockLineChartData,
  mockBarChartData,
  mockDonutChartData,
  mockTableData,
  generateRandomData
} from "@/lib/mock-data";
import { motion } from "framer-motion";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [lineData, setLineData] = useState(mockLineChartData);
  const [barData, setBarData] = useState(mockBarChartData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setLineData(current => generateRandomData(current, 0.1));
        setBarData(current => generateRandomData(current, 0.15));
        setMetrics(current => current.map(metric => ({
          ...metric,
          change: Math.random() > 0.5
            ? +(Math.random() * 10).toFixed(1)
            : -(Math.random() * 5).toFixed(1),
          changeType: Math.random() > 0.3 ? 'increase' : 'decrease'
        })));
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [loading]);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLineData(generateRandomData(mockLineChartData, 0.2));
      setBarData(generateRandomData(mockBarChartData, 0.25));
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <DashboardHeader />
        <main className="p-6 space-y-6">
          {/* Loading Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>
          {/* Loading Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <div className="lg:col-span-1">
              <TableSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <DashboardHeader />
      <main className="p-6 space-y-12">
        {/* Last updated and refresh */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button
            onClick={refreshData}
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-[#F64C67]/10 hover:border-[#F64C67] hover:text-[#F64C67]"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Metrics Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-accent">Metrics Overview</h2>
          <p className="text-muted-foreground mb-4">Key metrics for your business at a glance</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.title} metric={metric} index={index} />
            ))}
          </div>
        </section>

        {/* Performance Trends */}
        <section>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-accent">Performance Trends</h2>
          <p className="text-muted-foreground mb-4">Track your revenue, users, and conversions over time</p>
          <div className="max-w-6xl mx-auto">
            <LineChartCard data={lineData} />
          </div>
        </section>

        {/* Channel Performance */}
        <section>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-accent">Channel Performance</h2>
          <p className="text-muted-foreground mb-4">Compare performance across different marketing channels</p>
          <div className="max-w-6xl mx-auto">
            <BarChartCard data={barData} />
          </div>
        </section>

        {/* Traffic Sources */}
        <section>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-accent">Traffic Sources</h2>
          <p className="text-muted-foreground mb-4">Breakdown of traffic by device type</p>
          <div className="max-w-6xl mx-auto">
            <DonutChartCard data={mockDonutChartData} />
          </div>
        </section>

        {/* Campaign Data */}
        <section>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-accent">Campaign Data</h2>
          <p className="text-accent mb-4">Detailed view of all your marketing campaigns</p>
          <div className="max-w-7xl mx-auto">
            <DataTable data={mockTableData} />
          </div>
        </section>
      </main>
    </div>
  );
}