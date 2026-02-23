"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { day: "Mon", applications: 8 },
  { day: "Tue", applications: 15 },
  { day: "Wed", applications: 11 },
  { day: "Thu", applications: 22 },
  { day: "Fri", applications: 18 },
  { day: "Sat", applications: 5 },
  { day: "Sun", applications: 12 },
];

const WeeklyApplicationsChart = () => {
  return (
    <>
      <Card className="p-4 lg:p-6 bg-white border border-border">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-bold text-foreground">
            Applications This Week
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="applications" fill="#d87943" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default WeeklyApplicationsChart;
