"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard as MetricCardType } from "@/types/dashboard";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Zap
};

export function MetricCard({ metric, index }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const ChangeIcon = metric.changeType === 'increase' ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F64C67] to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </CardTitle>
          <div className="p-2 rounded-full bg-gradient-to-r from-accent to-accent/80 group-hover:scale-110 transition-transform duration-200">
            <Icon className="h-4 w-4 text-black dark:text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight text-accent">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <ChangeIcon 
                  className={`h-3 w-3 ${metric.changeType === 'increase'
                    ? 'text-accent'
                      : 'text-orange-500'
                  }`} 
                />
                <span className={`${metric.changeType === 'increase'
                  ? 'text-accent'
                    : 'text-orange-500'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}