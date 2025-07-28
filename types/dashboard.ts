export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableData {
  id: string;
  campaign: string;
  revenue: number;
  users: number;
  conversions: number;
  ctr: number;
  status: 'active' | 'paused' | 'completed';
  date: string;
}

export interface FilterOptions {
  dateRange: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}