"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from "@/types/dashboard";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BarChartCardProps {
  data: ChartData[];
  title?: string;
  description?: string;
}

export function BarChartCard({ data, title, description }: BarChartCardProps) {
  const gradientId = "accentBarGradient";
  const chartRef = useRef<HTMLDivElement>(null);
  const [accent, setAccent] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--accent') || '220 70% 50%');

  useEffect(() => {
    // Watch for changes to the --accent CSS variable
    const observer = new MutationObserver(() => {
      const newAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '220 70% 50%';
      setAccent(newAccent);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const svg = chartRef.current.querySelector('svg');
      if (svg) {
        let grad = svg.querySelector(`#${gradientId}`);
        if (!grad) {
          grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          grad.setAttribute('id', gradientId);
          grad.setAttribute('x1', '0');
          grad.setAttribute('y1', '0');
          grad.setAttribute('x2', '0');
          grad.setAttribute('y2', '1');
          svg.querySelector('defs')?.appendChild(grad);
        }
        grad.innerHTML = `
          <stop offset="5%" stop-color="hsl(${accent})" stop-opacity="0.9" />
          <stop offset="95%" stop-color="hsl(${accent} / 0.3)" stop-opacity="0.6" />
        `;
      }
    }
  }, [accent, data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          {title && <CardTitle className="text-lg text-accent">{title}</CardTitle>}
          {description && <CardDescription className="text-accent">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full" ref={chartRef}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground) / 0.2)' }}
                  tickLine={false}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground) / 0.2)' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--accent))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    color: 'hsl(var(--accent))',
                  }}
                  cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                />
                <Bar
                  dataKey="value"
                  fill={`url(#${gradientId})`}
                  radius={[12, 12, 0, 0]}
                  isAnimationActive={true}
                  onMouseOver={e => e && (e.target.style.filter = 'drop-shadow(0 2px 8px hsl(var(--accent) / 0.4)) scale(1.04)')}
                  onMouseOut={e => e && (e.target.style.filter = '')}
                >
                  {data.map((entry, idx) => (
                    <>
                      {/* Value label on top of bar */}
                      <text
                        key={"label-" + idx}
                        x={0}
                        y={0}
                        dy={-8}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight={700}
                        fill="hsl(var(--accent))"
                      >
                        {entry.value}
                      </text>
                    </>
                  ))}
                </Bar>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F64C67" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}