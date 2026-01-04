import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6", // light grey overall bg
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          backgroundColor: "#111827", // dark sidebar
          color: "#ffffff",
          padding: "24px",
        }}
      >
        <h2
          style={{
            marginBottom: "32px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Link href="/dashboard" style={linkStyle}>
            Dashboard
          </Link>

          <Link href="/dashboard/products" style={linkStyle}>
            Products
          </Link>

          <Link href="/dashboard/products/new" style={linkStyle}>
            Add Product
          </Link>

          <Link href="/login" style={linkStyle}>
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {/* White content card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            minHeight: "100%",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#e5e7eb",
  padding: "10px 14px",
  borderRadius: "6px",
  backgroundColor: "#1f2937",
};
