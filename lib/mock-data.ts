import { MetricCard, ChartData, TableData } from '@/types/dashboard';

export const mockMetrics: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: 12.5,
    changeType: 'increase',
    icon: 'DollarSign',
    color: 'text-[#F64C67]'
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: 8.2,
    changeType: 'increase',
    icon: 'Users',
    color: 'text-purple-600'
  },
  {
    title: 'Conversions',
    value: '1,247',
    change: -2.1,
    changeType: 'decrease',
    icon: 'Target',
    color: 'text-cyan-600'
  },
  {
    title: 'Growth Rate',
    value: '15.3%',
    change: 5.7,
    changeType: 'increase',
    icon: 'Zap',
    color: 'text-orange-600'
  }
];

export const mockLineChartData: ChartData[] = [
  { name: 'Jan', revenue: 4000, users: 2400, conversions: 240 },
  { name: 'Feb', revenue: 3000, users: 1398, conversions: 221 },
  { name: 'Mar', revenue: 2000, users: 9800, conversions: 229 },
  { name: 'Apr', revenue: 2780, users: 3908, conversions: 200 },
  { name: 'May', revenue: 1890, users: 4800, conversions: 218 },
  { name: 'Jun', revenue: 2390, users: 3800, conversions: 250 },
  { name: 'Jul', revenue: 3490, users: 4300, conversions: 210 }
];

export const mockBarChartData: ChartData[] = [
  { name: 'Google Ads', value: 4000 },
  { name: 'Facebook', value: 3000 },
  { name: 'Instagram', value: 2000 },
  { name: 'LinkedIn', value: 2780 },
  { name: 'Twitter', value: 1890 },
  { name: 'TikTok', value: 2390 }
];

export const mockDonutChartData: ChartData[] = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 }
];

const today = new Date();
const pad = (n: number) => n.toString().padStart(2, '0');
const yyyy = today.getFullYear();
const mm = pad(today.getMonth() + 1);
const dd = pad(today.getDate());

export const mockTableData: TableData[] = [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    revenue: 15420,
    users: 2847,
    conversions: 124,
    ctr: 3.2,
    status: 'active',
    date: '2019-06-01'
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q1',
    revenue: 8930,
    users: 1596,
    conversions: 89,
    ctr: 2.8,
    status: 'active',
    date: '2020-07-02'
  },
  {
    id: '3',
    campaign: 'Product Launch',
    revenue: 22150,
    users: 3241,
    conversions: 187,
    ctr: 4.1,
    status: 'completed',
    date: '2021-08-03'
  },
  {
    id: '4',
    campaign: 'Holiday Special',
    revenue: 12680,
    users: 2104,
    conversions: 156,
    ctr: 3.7,
    status: 'paused',
    date: '2022-09-04'
  },
  {
    id: '5',
    campaign: 'Back to School',
    revenue: 9870,
    users: 1789,
    conversions: 98,
    ctr: 2.9,
    status: 'active',
    date: '2023-10-05'
  },
  {
    id: '6',
    campaign: 'Spring Promo',
    revenue: 11200,
    users: 2000,
    conversions: 110,
    ctr: 3.5,
    status: 'active',
    date: '2024-11-06'
  },
  {
    id: '7',
    campaign: 'Winter Clearance',
    revenue: 13400,
    users: 2200,
    conversions: 120,
    ctr: 3.1,
    status: 'completed',
    date: '2025-12-07'
  },
  {
    id: '8',
    campaign: 'Flash Sale',
    revenue: 14500,
    users: 2500,
    conversions: 130,
    ctr: 3.8,
    status: 'paused',
    date: '2026-01-08'
  },
  {
    id: '9',
    campaign: 'Referral Boost',
    revenue: 12000,
    users: 2100,
    conversions: 105,
    ctr: 2.7,
    status: 'active',
    date: '2027-02-09'
  },
  {
    id: '10',
    campaign: 'Black Friday',
    revenue: 25000,
    users: 4000,
    conversions: 200,
    ctr: 5.0,
    status: 'completed',
    date: '2028-03-10'
  },
  {
    id: '11',
    campaign: 'Cyber Monday',
    revenue: 18000,
    users: 3500,
    conversions: 170,
    ctr: 4.5,
    status: 'active',
    date: '2029-04-11'
  },
  {
    id: '12',
    campaign: 'New Year Blast',
    revenue: 16000,
    users: 3000,
    conversions: 140,
    ctr: 3.9,
    status: 'paused',
    date: '2030-05-12'
  },
  {
    id: '13',
    campaign: 'Customer Appreciation',
    revenue: 10500,
    users: 1800,
    conversions: 90,
    ctr: 2.5,
    status: 'active',
    date: '2031-06-13'
  },
  {
    id: '14',
    campaign: 'VIP Exclusive',
    revenue: 19500,
    users: 3200,
    conversions: 160,
    ctr: 4.2,
    status: 'completed',
    date: '2032-07-14'
  },
  {
    id: '15',
    campaign: 'Anniversary Event',
    revenue: 17000,
    users: 2900,
    conversions: 150,
    ctr: 3.6,
    status: 'active',
    date: '2033-08-15'
  }
];

// Function to generate random data variations for real-time updates
export const generateRandomData = (baseData: any[], variance: number = 0.2) => {
  return baseData.map(item => ({
    ...item,
    value: typeof item.value === 'number'
      ? Math.round(item.value * (1 + (Math.random() - 0.5) * variance))
      : item.value,
    revenue: typeof item.revenue === 'number'
      ? Math.round(item.revenue * (1 + (Math.random() - 0.5) * variance))
      : item.revenue,
    users: typeof item.users === 'number'
      ? Math.round(item.users * (1 + (Math.random() - 0.5) * variance))
      : item.users
  }));
};