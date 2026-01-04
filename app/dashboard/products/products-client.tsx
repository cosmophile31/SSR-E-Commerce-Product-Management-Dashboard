"use client";

import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      router.refresh();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{product.name}</strong>
            <p>
              ₹{product.price} | Stock: {product.stock}
            </p>
          </div>

          {/*  NOT inside a form */}
          <button
  type="button"
  onClick={async () => {
    alert("Before fetch");

    const res = await fetch(
      `${window.location.origin}/api/products/${product._id}`,
      { method: "DELETE" }
    );

    alert("After fetch: " + res.status);
  }}
>
  Delete
</button>

        </div>
      ))}
    </div>
  );
}
