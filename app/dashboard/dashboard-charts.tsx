"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardCharts({
  products,
}: {
  products: any[];
}) {
  const chartData = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Stock Distribution</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
