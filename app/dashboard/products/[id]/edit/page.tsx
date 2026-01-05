import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  

const product = await Product.findById(
  new mongoose.Types.ObjectId(params.id)
).lean();


  if (!product) {
    return <div>Product not found</div>;
  }

  async function updateProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;

    await connectDB();

    await Product.findByIdAndUpdate(params.id, {
      name,
      price,
      stock,
      category,
    });

    redirect("/dashboard/products");
  }

  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Edit Product
      </h1>

      <form action={updateProduct} style={{ display: "grid", gap: "16px" }}>
        <div>
          <label>Name</label>
          <br />
          <input
            name="name"
            defaultValue={product.name}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Price</label>
          <br />
          <input
            name="price"
            type="number"
            defaultValue={product.price}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Stock</label>
          <br />
          <input
            name="stock"
            type="number"
            defaultValue={product.stock}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Category</label>
          <br />
          <input
            name="category"
            defaultValue={product.category}
            style={inputStyle}
          />
        </div>

        <button style={buttonStyle}>Update Product</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  width: "300px",
};

const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  width: "fit-content",
};
