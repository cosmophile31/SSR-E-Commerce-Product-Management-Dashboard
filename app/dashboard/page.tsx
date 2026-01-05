import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();
  const products = await Product.find();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total products: {products.length}</p>
    </div>
  );
}

