import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Logo from "../public/microwrk-logo.svg"; // Adjust the path as needed
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "microwrk.online - Automate Daily Tasks",
  description:
    "Explore our free utilities — from Telegram PC control to YouTube chapter downloads. Automate your daily workflow with powerful tools.",
  keywords:
    "automation, tools, telegram, youtube, instagram, productivity, microwrk",
  authors: [{ name: "microwrk.online" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth relative`}>
        {/* Background image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src={Logo}
            alt="Background"
            fill
            className="object-cover"
            quality={80}
            priority
          />
        </div>

        {/* Page content */}
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
