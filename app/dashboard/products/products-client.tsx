"use client";

import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  images?: string[];
};

export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (!products.length) {
    return (
      <div style={emptyState}>
        <h3>No products found</h3>
        <p>Add your first product to get started 🚀</p>
      </div>
    );
  }

  return (
    <div style={card}>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Product</th>
            <th style={th}>Price</th>
            <th style={th}>Stock</th>
            <th style={th}>Category</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} style={row}>
              <td style={td}>
                <div style={productCell}>
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={image}
                    />
                  ) : (
                    <div style={imagePlaceholder}>📦</div>
                  )}

                  <strong>{p.name}</strong>
                </div>
              </td>

              <td style={td}>₹{p.price.toLocaleString()}</td>

              <td style={td}>
                <span
                  style={{
                    ...stockBadge,
                    backgroundColor:
                      p.stock > 0 ? "#dcfce7" : "#fee2e2",
                    color: p.stock > 0 ? "#166534" : "#991b1b",
                  }}
                >
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </td>

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
    </div>
  );
}

/* ---------- STYLES ---------- */

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  textAlign: "left" as const,
  padding: "14px",
  fontWeight: 600,
  color: "#374151",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "14px",
  verticalAlign: "middle",
};

const row = {
  borderBottom: "1px solid #f1f5f9",
};

const productCell = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const image = {
  width: "42px",
  height: "42px",
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const imagePlaceholder = {
  width: "42px",
  height: "42px",
  borderRadius: "8px",
  backgroundColor: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
};

const stockBadge = {
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
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

const emptyState = {
  padding: "60px",
  textAlign: "center" as const,
  color: "#6b7280",
};
