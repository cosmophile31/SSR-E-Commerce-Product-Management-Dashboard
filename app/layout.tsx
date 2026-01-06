import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "E-Commerce Admin Dashboard",
  description: "SSR Admin Dashboard for Product Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen",
        }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

