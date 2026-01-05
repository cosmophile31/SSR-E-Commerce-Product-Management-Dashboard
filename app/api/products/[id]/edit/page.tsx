"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setCategory(data.category);
      setLoading(false);
    }

    fetchProduct();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/products/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        stock,
        category,
      }),
    });

    router.push("/dashboard/products");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Price</label><br />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Stock</label><br />
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
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

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
