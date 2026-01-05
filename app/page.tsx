import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#111827",
          }}
        >
          E-Commerce Admin Dashboard
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            marginBottom: "28px",
          }}
        >
          A server-side rendered product management system for administrators.
        </p>

        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "30px",
            fontSize: "14px",
            color: "#374151",
          }}
        >
          🔐 This application is restricted to administrators only.
          <br />
          Please log in to manage products and view dashboard analytics.
        </div>

        <Link
          href="/login"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Go to Admin Login →
        </Link>

        
      </div>
    </main>
  );
}
