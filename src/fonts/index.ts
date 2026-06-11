import localFont from 'next/font/local'

/**
 * Self-hosted brand fonts (woff2, src/fonts/).
 * Makira Sans — display + body grotesk (ink-trapped, carries the headline at 900).
 * IBM Plex Mono — all mono/UI/label text.
 *
 * next/font/local rewrites family names (e.g. "__makira_a1b2c3"), so nothing
 * outside this file may reference font families by literal name — always go
 * through the CSS variables below (mapped in app/globals.css @theme).
 */
export const makira = localFont({
  src: [
    { path: './Makira-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Makira-Medium.woff2', weight: '500', style: 'normal' },
    { path: './Makira-Bold.woff2', weight: '700', style: 'normal' },
    { path: './Makira-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-makira',
  display: 'swap',
})

export const plexMono = localFont({
  src: [
    { path: './IBMPlexMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './IBMPlexMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: './IBMPlexMono-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
})
