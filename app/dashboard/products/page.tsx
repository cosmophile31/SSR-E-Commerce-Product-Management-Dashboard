
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductsClient from "./products-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find().lean();

  // Convert Mongo objects → plain JS
  const plainProducts = products.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: p.category,
    images: p.images || [],
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Products
      </h1>

      <ProductsClient products={plainProducts} />
    </div>
  );
}
