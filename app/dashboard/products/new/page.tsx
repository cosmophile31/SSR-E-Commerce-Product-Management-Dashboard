"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    // 🔹 Upload image to Cloudinary
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    // 🔹 Create product
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        stock,
        category,
        images: imageUrl ? [imageUrl] : [],
      }),
    });

    setLoading(false);
    router.push("/dashboard/products");
  }

  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Add New Product
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <br />

        <div>
          <label>Price</label><br />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Stock</label><br />
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label><br />
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Product Image</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}


