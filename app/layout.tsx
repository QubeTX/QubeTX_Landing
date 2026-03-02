import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/effects/CustomCursor";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QubeTX | Web Development & Digital Infrastructure",
  description: "Professional website development, maintenance services, and backend API infrastructure for modern digital businesses.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/qubeTXFavicon.png', type: 'image/png' },
    ],
    apple: '/qubeTXFavicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${unbounded.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

