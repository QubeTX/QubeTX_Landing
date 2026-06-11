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
    // suppressHydrationWarning: the inline FOUC-guard script adds data-loading
    // to <html> before hydration (same pattern as theme scripts)
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${makira.variable} ${plexMono.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30`}
      >
        {/* FOUC guard for the load sequence: hide [data-load] targets before
            first paint; LoadSequence lifts it; 3s failsafe; no-JS never sets it */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-loading','');setTimeout(function(){document.documentElement.removeAttribute('data-loading')},3000);",
          }}
        />
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

