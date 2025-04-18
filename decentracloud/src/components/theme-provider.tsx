"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      attribute="class"
      defaultTheme="system"
      storageKey="decentracloud-theme"
      disableTransitionOnChange
      forcedTheme={props.forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
}
