import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const totalProducts = await Product.countDocuments();
  const outOfStock = await Product.countDocuments({ stock: 0 });

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={card}>
          <h3>Total Products</h3>
          <p style={number}>{totalProducts}</p>
        </div>

        <div style={card}>
          <h3>Out of Stock</h3>
          <p style={number}>{outOfStock}</p>
        </div>
      </div>
    </div>
  );
}

const card = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  width: "200px",
};

const number = {
  fontSize: "32px",
  fontWeight: "bold",
};


