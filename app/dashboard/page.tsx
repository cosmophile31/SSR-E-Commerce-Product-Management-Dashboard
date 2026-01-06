import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductStockChart from "./components/ProductStockChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find().lean();

  const totalStock = products.reduce(
  (sum, p) => sum + p.stock,
  0
);

const totalInventoryValue = products.reduce(
  (sum, p) => sum + p.price * p.stock,
  0
);


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

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
  <div style={cardStyle}>
    <h4>Total Stock</h4>
    <p style={valueStyle}>{totalStock}</p>
  </div>

  <div style={cardStyle}>
    <h4>Inventory Value</h4>
    <p style={valueStyle}>
      ₹{totalInventoryValue.toLocaleString()}
    </p>
  </div>
</div>


      

      {/*  Recharts Visualization */}
      <ProductStockChart products={plainProducts} />
    </div>
  );
}
const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  minWidth: "200px",
};

const valueStyle = {
  fontSize: "26px",
  fontWeight: "bold",
  marginTop: "8px",
};

