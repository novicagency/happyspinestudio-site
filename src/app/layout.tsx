import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Happy Spine Studio | Chiropractor in Myrtle Beach, SC",
  description: "Personalized chiropractic care in Myrtle Beach. New patients just $29. Walk-ins welcome. Call (843) 831-0033 to book your appointment.",
  keywords: "chiropractor, Myrtle Beach, chiropractic, back pain, neck pain, spinal adjustment, SC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${plusJakarta.variable} antialiased`} style={{ fontFamily: 'var(--font-poppins)' }}>
        {children}
      </body>
    </html>
  );
}
