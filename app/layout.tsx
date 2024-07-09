import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResuShape",
  description: "ResuShape is a cutting-edge resume generator platform designed to help you craft visually stunning and highly professional resumes. Utilizing advanced LaTeX typesetting, ResuShape ensures your resume stands out with impeccable formatting and design. Whether you’re a seasoned professional or a recent graduate, ResuShape provides customizable templates and intuitive tools to shape your resume to perfection. Transform your career prospects with ResuShape’s elegant and efficient resume creation process.",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
