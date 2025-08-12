import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microwrk Online - Automate Daily Tasks",
  description:
    "Explore our free utilities — from Telegram PC control to YouTube chapter downloads. Automate your daily workflow with powerful tools.",
  keywords:
    "automation, tools, telegram, youtube, instagram, productivity, microwrk",
  authors: [{ name: "microwrk.online" }],
  viewport: "width=device-width, initial-scale=1",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Microwrk Online - Automate Daily Tasks",
    description: "Free automation tools to make your daily work easier.",
    url: "https://microwrk.online",
    siteName: "Microwrk Online",
    images: [
      {
        url: "/og-image.jpg", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Microwrk Online Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@microwrk", // your Twitter handle if any
    creator: "@microwrk",
    title: "Microwrk Online - Automate Daily Tasks",
    description: "Free automation tools for productivity.",
    images: ["/og-image.jpg"],
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
        <link rel="canonical" href="https://microwrk.online" />
        <meta name="robots" content="index, follow" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Microwrk Online",
              url: "https://microwrk.online",
              description:
                "Explore our free utilities — from Telegram PC control to YouTube chapter downloads.",
              publisher: {
                "@type": "Organization",
                name: "Microwrk",
                logo: {
                  "@type": "ImageObject",
                  url: "https://microwrk.online/logo.png",
                },
              },
            }),
          }}
        />
      </head>

      <body className={`${inter.className} scroll-smooth relative`}>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
