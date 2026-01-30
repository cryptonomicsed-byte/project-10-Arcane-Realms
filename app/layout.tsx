import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcane Realms",
  description: "Multiplayer AI Dungeon Master",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
