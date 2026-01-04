
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductsClient from "./products-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find();

  // IMP
  const plainProducts = JSON.parse(JSON.stringify(products));

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Products
      </h1>

      <ProductsClient products={plainProducts} />
    </div>
  );
}
