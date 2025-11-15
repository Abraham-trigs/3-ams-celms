// File: app/components/home/TopBar.tsx
// Purpose: Top Bar for 3-AMS-CELMS with logo left, phone/email in one wrapper center, and "Request a Quote" right

"use client";

import React from "react";
import Image from "next/image";

interface TopBarProps {
  phone?: string;
  email?: string;
}

export default function TopBar({
  phone = "+233 123 456 789",
  email = "info@example.com",
}: TopBarProps) {
  return (
    <div className="w-full bg-[var(--color-primary-hover)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            alt="3-AMS-CELMS Logo"
            width={120}
            height={50}
            priority
          />
        </div>

        {/* Center + Right Wrapper: Phone/Email + Request a Quote */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
          {/* Phone & Email */}
          <div className="flex flex-col text-sm text-white text-center sm:text-left">
            <span>{phone}</span>
            <span>{email}</span>
          </div>

          {/* Request a Quote Button */}
          <div>
            <button className="px-4 py-2 rounded bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white transition-colors">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Design reasoning
- Increased topbar height (py-4) to comfortably contain phone/email + button.
- Phone above email in a single div for readability.
- Flex wrapper for middle and right ensures consistent spacing and alignment.
- Logo left remains fixed and visually balanced.

Structure
- Left: Logo (Next.js Image)
- Center: Phone above Email
- Right: Request a Quote button, wrapped together with center for proper spacing

Implementation guidance
- Tailwind flex and spacing utilities handle responsive stacking.
- Adjust `py-4` or `sm:space-x-8` for vertical/horizontal spacing changes.

Scalability insight
- Additional contact info or CTA buttons can be added to the center-right wrapper.
- Layout remains responsive and aligned with max-width global container.
*/
