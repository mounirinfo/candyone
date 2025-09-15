"use client";

import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/theme/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

/**
 * Crée un cache Emotion côté client avec le bon "insertionPoint"
 * pour éviter les FOUC et respecter l'ordre des styles.
 */
function createEmotionCache() {
  let insertionPoint: HTMLElement | undefined;

  if (typeof document !== "undefined") {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui", insertionPoint });
}

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => createEmotionCache());

  // Injecte la balise <style> SSR dans le stream HTML (App Router)
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}