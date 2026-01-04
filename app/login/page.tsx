"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 🔥 THIS IS CRITICAL
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // set cookie in browser only
    document.cookie = "admin-auth=true; path=/";
    router.push("/dashboard");
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label><br />
          <input type="email" required />
        </div>

        <br />

        <div>
          <label>Password</label><br />
          <input type="password" required />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
