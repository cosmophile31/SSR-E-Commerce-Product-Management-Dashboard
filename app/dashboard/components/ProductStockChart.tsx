"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Product = {
  name: string;
  stock: number;
};

export default function ProductStockChart({
  products,
}: {
  products: Product[];
}) {
  return (
    <div
      style={{
        marginTop: "40px",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
        Product Stock Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
