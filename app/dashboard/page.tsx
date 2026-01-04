import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import DashboardCharts from "./dashboard-charts";


export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find();

  const plainProducts = JSON.parse(JSON.stringify(products));

  const totalProducts = plainProducts.length;
  const totalStock = plainProducts.reduce(
    (sum: number, p: any) => sum + p.stock,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Total Stock</h2>
          <p>{totalStock}</p>
        </div>
      </div>

      <DashboardCharts products={plainProducts} />
    </div>
  );
}
