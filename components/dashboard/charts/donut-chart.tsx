"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartData } from "@/types/dashboard";
import { motion } from "framer-motion";

interface DonutChartCardProps {
  data: ChartData[];
  title?: string;
  description?: string;
}

const COLORS = ['#F64C67', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export function DonutChartCard({ data, title, description }: DonutChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          {title && <CardTitle className="text-lg text-accent">{title}</CardTitle>}
          {description && <CardDescription className="text-accent">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}