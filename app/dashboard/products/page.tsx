
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductsClient from "./products-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find().lean();

  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Products
      </h1>

      <ProductsClient products={products} />
    </div>
  );
}
