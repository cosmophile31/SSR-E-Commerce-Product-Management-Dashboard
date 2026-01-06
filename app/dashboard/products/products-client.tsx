"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  images?: string[];
};

export default function ProductsClient() {
  const router = useRouter();

  // ✅ React Query fetching products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    // Refresh React Query + SSR data
    router.refresh();
  }

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f9fafb" }}>
          <th style={th}>Product</th>
          <th style={th}>Price</th>
          <th style={th}>Stock</th>
          <th style={th}>Category</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
            <td style={td}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <strong>{p.name}</strong>
              </div>
            </td>

            <td style={td}>₹{p.price}</td>
            <td style={td}>{p.stock}</td>
            <td style={td}>{p.category || "-"}</td>

            <td style={td}>
              <a
                href={`/dashboard/products/${p._id}/edit`}
                style={editBtn}
              >
                Edit
              </a>

              <button
                onClick={() => handleDelete(p._id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  textAlign: "left" as const,
  padding: "14px",
};

const td = {
  padding: "14px",
};

const editBtn = {
  marginRight: "14px",
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500,
};

const deleteBtn = {
  color: "#dc2626",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};
