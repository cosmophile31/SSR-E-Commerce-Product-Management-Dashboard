"use client";

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
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    window.location.reload();
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
              <strong>{p.name}</strong>
            </td>

            <td style={td}>₹{p.price.toLocaleString()}</td>

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
  fontWeight: "600",
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
