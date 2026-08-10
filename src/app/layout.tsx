import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://misssstudio.in"),
  title: {
    default: "Miss Studio | Premium Saree Boutique",
    template: "%s | Miss Studio",
  },
  description: "Curating the finest luxury sarees with unparalleled craftsmanship.",
  keywords: ["saree", "premium sarees", "luxury sarees", "designer sarees", "Miss Studio", "Indian ethnic wear"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Miss Studio | Premium Saree Boutique",
    description: "Curating the finest luxury sarees with unparalleled craftsmanship.",
    url: "https://misssstudio.in",
    siteName: "Miss Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miss Studio | Premium Saree Boutique",
    description: "Curating the finest luxury sarees with unparalleled craftsmanship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Miss Studio",
    url: "https://misssstudio.in",
    logo: "https://misssstudio.in/icon.png",
    description: "Curating the finest luxury sarees with unparalleled craftsmanship.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Miss Studio",
    url: "https://misssstudio.in",
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CartProvider>
          <Toaster position="bottom-right" />
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
