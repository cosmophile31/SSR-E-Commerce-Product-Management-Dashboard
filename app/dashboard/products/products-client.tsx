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
  if (!confirm("Delete this product?")) return;

  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  window.location.href = "/dashboard/products";
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
            {/* ✅ PRODUCT + IMAGE */}
            <td style={td}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {p.images && p.images.length > 0 && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <strong>{p.name}</strong>
              </div>
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

/* ---------- styles ---------- */

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
