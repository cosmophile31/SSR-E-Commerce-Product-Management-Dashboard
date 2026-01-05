import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";


export const dynamic = "force-dynamic";

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;

  const imageFile = formData.get("image") as File;

  // 🔥 Convert image to buffer
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 🔥 Upload directly to Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  const imageUrl = uploadResult.secure_url;

  await connectDB();

  await Product.create({
    name,
    price,
    stock,
    category,
    images: [imageUrl],
  });

  redirect("/dashboard/products");
}


  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Add Product
      </h1>

      <form action={createProduct} style={{ display: "grid", gap: "16px" }}>
        <div>
          <label>Name</label>
          <br />
          <input name="name" required style={inputStyle} />
        </div>

        <div>
          <label>Price</label>
          <br />
          <input name="price" type="number" required style={inputStyle} />
        </div>

        <div>
          <label>Stock</label>
          <br />
          <input name="stock" type="number" required style={inputStyle} />
        </div>

        <div>
          <label>Category</label>
          <br />
          <input name="category" style={inputStyle} />
        </div>

        {/* 🔥 IMAGE INPUT */}
        <div>
          <label>Product Image</label>
          <br />
          <input
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>

        <button style={buttonStyle}>Create Product</button>
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
