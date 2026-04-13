"use client";

import React from "react";
// Import your actual screen components here
// import { WelcomeScreen } from "../screens/WelcomeScreen";
// import { DataGrid } from "../screens/DataGrid";
// import { DetailView } from "../screens/DetailView";

interface ModalRendererProps {
  id: string | null;
  zone: "TOP" | "DOWN";
}

/**
 * THE CENTRAL DISPATCHER
 * This component resolves which UI fragment to show based on the ID
 * provided by the layout engine.
 */
export function ModalRenderer({ id, zone }: ModalRendererProps) {
  if (!id) return null;

  // This Map acts as your Screen Registry
  // It matches the IDs used in your layout.engine.ts
  switch (id) {
    case "WELCOME_HEADER":
      return <div className="glass-card">Welcome to Zodiac</div>;

    case "MAIN_CONTROLS":
      return <div className="glass-card">Primary Controls (Zone: {zone})</div>;

    case "DATA_LIST":
      return <div className="glass-card">Active Data Stream</div>;

    case "USER_PROFILE":
      return <div className="glass-card">User Settings & Details</div>;

    // Default fallback to prevent the shell from breaking
    default:
      return (
        <div className="p-4 opacity-50">
          Screen "{id}" not found in {zone} dispatcher.
        </div>
      );
  }
}
