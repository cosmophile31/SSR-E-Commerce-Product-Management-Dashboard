"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          backgroundColor: "#111827",
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

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              ...linkStyle,
              textAlign: "left",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#7f1d1d",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {/* Content Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "32px",
            minHeight: "100%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
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
