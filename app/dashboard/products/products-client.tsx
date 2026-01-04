"use client";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
};

export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {
  async function handleDelete(id: string) {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.category}</td>

            <td>
              {/* ✅ EDIT BUTTON */}
              <a
                href={`/dashboard/products/${product._id}/edit`}
                style={{ marginRight: "12px", color: "blue" }}
              >
                Edit
              </a>

              {/* ✅ DELETE BUTTON */}
              <button
                onClick={() => handleDelete(product._id)}
                style={{ color: "red" }}
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
