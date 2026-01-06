import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductStockChart from "./components/ProductStockChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find().lean();

  const plainProducts = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  return (
    <div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontSize: "18px" }}>Total Products</h2>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {products.length}
        </p>
      </div>

      {/*  Recharts Visualization */}
      <ProductStockChart products={plainProducts} />
    </div>
  );
}
