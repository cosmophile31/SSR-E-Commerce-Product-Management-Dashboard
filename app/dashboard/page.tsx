import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find();

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum: number, p: any) => sum + (p.stock || 0),
    0
  );

  const totalValue = products.reduce(
    (sum: number, p: any) => sum + (p.price || 0) * (p.stock || 0),
    0
  );

  const categories = new Set(
    products.map((p: any) => p.category).filter(Boolean)
  );

  const totalCategories = categories.size;

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        Dashboard Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Stock Units" value={totalStock} />
        <StatCard
          title="Inventory Value"
          value={`₹${totalValue.toLocaleString()}`}
        />
        <StatCard title="Categories" value={totalCategories} />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ color: "#6b7280", marginBottom: "8px" }}>{title}</p>
      <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>{value}</h2>
    </div>
  );
}
