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
        {/* Pre-paint guards (no-JS never sets either attribute):
            - data-loading hides [data-load] entrance targets; LoadSequence
              lifts it; 3s failsafe.
            - data-boot arms the BootScreen overlay — HOME ROUTE ONLY (the
              boot moment belongs to the landing; /design-system and
              /wallpaper never arm), only on the first visit of the session
              (sessionStorage flag) and never under reduced motion; 10s
              failsafe so a hydration failure can't trap anyone. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.setAttribute('data-loading','');" +
              "try{if(location.pathname==='/'&&!sessionStorage.getItem('qubetx:booted')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-boot','')}}catch(e){}" +
              "setTimeout(function(){d.removeAttribute('data-loading')},3000);" +
              "setTimeout(function(){d.removeAttribute('data-boot')},10000);})();",
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

