import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const product = await Product.findById(params.id).lean();

  if (!product) return notFound();

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
    <form action={updateProduct} style={{ maxWidth: "500px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Edit Product
      </h1>

      <input
        name="name"
        defaultValue={product.name}
        required
        style={input}
      />

      <input
        name="price"
        type="number"
        defaultValue={product.price}
        required
        style={input}
      />

      <input
        name="stock"
        type="number"
        defaultValue={product.stock}
        required
        style={input}
      />

      <input
        name="category"
        defaultValue={product.category}
        style={input}
      />

      <button style={btn}>Update Product</button>
    </form>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
};

const btn = {
  padding: "10px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};
