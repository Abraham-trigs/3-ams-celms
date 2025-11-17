// app/components/Footer.tsx
import React from "react";

export default function YearTag() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} 3AMS-CELMS. All rights reserved.
      </p>
    </footer>
  );
}
