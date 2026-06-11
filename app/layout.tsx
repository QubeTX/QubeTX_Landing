import type { Metadata } from "next";
import "./globals.css";
import { makira, plexMono } from "@/fonts";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/effects/CustomCursor";
import { PretextProvider } from "@/lib/pretext";

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
        className={`${makira.variable} ${plexMono.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30`}
      >
        <PretextProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </PretextProvider>
      </body>
    </html>
  );
}

