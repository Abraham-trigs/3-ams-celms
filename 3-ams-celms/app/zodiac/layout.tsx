"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { useDataStore } from "./store/useDataStore"; // ✅ Import your store

export default function ZodiacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const initData = useDataStore((s) => s.initData); // ✅ Get init function

  useEffect(() => {
    setMounted(true);
    initData(); // 🚀 Trigger the fetch as soon as the layout mounts
  }, [initData]);

  if (!mounted)
    return <div className="mobile-wrapper" style={{ visibility: "hidden" }} />;

  return <div className="mobile-wrapper">{children}</div>;
}
