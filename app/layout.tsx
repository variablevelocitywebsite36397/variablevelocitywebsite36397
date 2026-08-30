import type { Metadata } from "next";
import { Inter, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-rajdhani" });
const jetbrainsMono = JetBrains_Mono({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Variable Velocity — Team 36397",
  description: "FIRST Tech Challenge Team 36397 — Dream. Build. Ascend.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
