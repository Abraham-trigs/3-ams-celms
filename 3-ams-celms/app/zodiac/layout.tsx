"use client"; // Add this since we are using Zustand stores inside components here

import "./globals.css";
import { useEffect, useState } from "react";

export default function ZodiacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fix for Hydration: Ensure component is mounted before rendering
  // This prevents the "Server vs Client" mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="mobile-wrapper" style={{ visibility: "hidden" }} />;

  return <div className="mobile-wrapper">{children}</div>;
}
