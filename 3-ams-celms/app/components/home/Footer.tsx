// File: app/components/home/Footer.tsx
// Purpose: Responsive footer with logo on the left, placeholder contact details in the center, and Google Maps on the right.

"use client";

import React from "react";
import Image from "next/image";

/* --------------------------------------------------------------------------
   Design reasoning:
   This layout uses a simple three-column flex grid: logo → contact → map.
   On large screens, each section has balanced width so the map does not feel cramped.
   On mobile, the layout stacks vertically to maintain readability.
   Contact details are placeholders — the real entity will replace them later.
   The Google Map embed is wrapped in a responsive container to avoid overflow.
--------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Structure:
   - <footer> root container
   - Left: company logo (placeholder)
   - Middle: contact details (placeholder text)
   - Right: Google Maps iframe (responsive wrapper)
--------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-background)] text-[var(--color-primary)] py-12 border-t border-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* LEFT: Logo */}
        <div className="flex flex-col items-start">
          <div className="w-32 h-20 relative">
            {/* Placeholder logo — replace with actual logo file */}
            <Image
              src="/logos/company-placeholder.png"
              alt="Company Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3">
            Aviation Solutions & Engineering Support
          </p>
        </div>

        {/* CENTER: CONTACT DETAILS (PLACEHOLDER INFO) */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold mb-1">Contact Ghana</h3>

          {/* Placeholder — entity will supply real details */}
          <p>Address: Airport Area, Accra, Ghana</p>
          <p>Phone 1: +233 55 000 1111</p>
          <p>Phone 2: +233 24 000 2222</p>
          <p>Email: info@example-aviation.com</p>
        </div>

        {/* RIGHT: GOOGLE MAP */}
        <div className="w-full h-56 sm:h-64 lg:h-72 overflow-hidden rounded-md">
          {/* Responsive iframe wrapper */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7727649217!2d-0.10502359999996974!3d5.600551600000011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf85ad10f34f7d%3A0xf7077b28504ce1f0!2sFord%20School!5e0!3m2!1sen!2sgh!4v1763344235681!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------------------
   Implementation guidance:
   - Drop this file at: app/components/home/Footer.tsx
   - Import into your main layout or page: 
       import Footer from "@/app/components/home/Footer";
   - Ensure the placeholder logo exists OR replace the src path.
   - Replace placeholder contact details when real info is provided.
--------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Scalability insight:
   This footer is modular: you can easily extend it with social icons,
   a second office location, or a CMS-driven contact block without 
   changing the overall structure.
--------------------------------------------------------------------------- */
