/**
 * Auto-generated blur placeholder data URIs for low-bandwidth / slow internet connections.
 * Provides instant smooth blur-up placeholders for all site images.
 */

export const defaultBlurDataURL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f5ebe1'/%3E%3Crect width='100%25' height='100%25' fill='%238c1f3a' fill-opacity='0.15' filter='url(%23b)'/%3E%3C/svg%3E";

export const imagePlaceholders: Record<string, string> = {
  "/images/ayurvedic-gold-facial-skin-treatment.webp": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoQABAABABoJZgCdACxtzPDWiAA/vV4/Zq9B0v9+yqXpRox5gT/OchPdO2Ey7xpNfrKtUAA",
  "/images/bengali-bridal-makeup-artist-debra.webp": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAwAgCdASoQABAABABoJagCdAEQ942zEWV2AAD+zm+jBiU1qd7E+OLcxWzSw5NQzxYElbdSKAAAAA==",
  "/images/bridal-makeover-studio-private-room.webp": "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoQABAABABoJZQAAtroLnfBbgAA/vEQMBbtPTn93BLSYlFbKOlyrHowFBCAAA==",
  "/images/eyebrow-threading-facial-grooming.webp": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoQABAABABoJQBOgB4LaeQAANkoexuws05iMqu9KwGo4HOO480g4ABOx2I4L1lj9oAAAA==",
  "/images/indian-bridal-eye-makeup-soft-glam.webp": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAABwAQCdASoQABAABABoJbACdACLAAD98/otKYLkBGOGNhZKQ8RNkpOb+NvLIxzcJ8B/7muvyAA=",
  "/images/indian-bridal-nail-art-maroon-gold.webp": "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADwAQCdASoQABAABABoJZQAAudcRwlxYAAA/suJRh3I8hPmwEYoDPeUQAA=",
  "/images/luxury-beauty-salon-interior-debra-medinipur.webp": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoQABAABABoJbACdADuz+QXjwAA/tBdmq/0PLgo5/tHSq9xfwvYuuNzUTJbNfNiQAA=",
  "/images/luxury-bridal-cosmetics-vanity-flatlay.webp": "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoQABAABABoJYgCdAD0gcQfAAD+6pWNKgyukIsU73LRJATdgYAAAA==",
  "/images/luxury-indian-hair-spa-wash.webp": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAAAQAgCdASoQABAABABoJZgCdAD0fuYtDLiAAP54cLyL0BSebvfH5+jejhQY3FiTqa+BhgAAAAA=",
  "/images/modern-hair-styling-stations-salon.webp": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoQABAABABoJaQAAsfwM/mbdAAA/fX2hlt8wCrVTkgYI76A3e2wpAAA",
  "/images/pro-eyeshadow-palette-bridal-makeup.webp": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoQABAABABoJYwC7AEKJfEwAP7wPvyoUt3NKJFi3WhERwt9i3tlNbHXoGI6X8aAAAA=",
  "/images/professional-makeup-artist-kit-brushes.webp": "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoQABAABABoJZQAAWSgQAD+3NNod4HYqLNE5sTEcgGodQHPaesqAA==",
  "/images/santi-dolai-founder-master-makeup-artist.webp": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoQABAABABoJbACdADiJi5w58AA/I6ND9XwSqo5HRUj+Q5cpdtysvLa1pBe+TqzgpNF5fAAAAA=",
  "/images/traditional-indian-bride-banarasi-saree.webp": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoQABAABABoJaACdAD0iZm+G1AA/uNFg5VJHLARiGIlJMNJD5ZnBDEZ2sy3ZQAA"
};

export function getBlurDataURL(src?: string): string {
  if (!src) return defaultBlurDataURL;
  const normalized = src.replace(/\.jpg$/i, ".webp");
  return imagePlaceholders[normalized] || imagePlaceholders[src] || defaultBlurDataURL;
}
