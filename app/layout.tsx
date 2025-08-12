import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microwrk online - Automate Daily Tasks",
  description:
    "Explore our free utilities — from Telegram PC control to YouTube chapter downloads. Automate your daily workflow with powerful tools.",
  keywords:
    "automation, tools, telegram, youtube, instagram, productivity, microwrk",
  authors: [{ name: "microwrk.online" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico", // path to your favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} scroll-smooth relative`}>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
