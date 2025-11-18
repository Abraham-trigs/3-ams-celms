// File: app/components/home/Footer.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReusableContactForm from "../home/ReusableContactForm"; // import the modal form

export default function Footer() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[var(--color-primary)] text-[var(--color-background)] py-12 border-t border-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* LEFT: Logo */}
          <div className="flex flex-col items-start">
            <div className="w-32 h-20 relative">
              <Image
                src="/logo.webp"
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-[var(--color-text-background)] mt-3">
              Aviation Solutions & Engineering Support
            </p>
          </div>

          {/* CENTER: CONTACT DETAILS (Clickable) */}
          <div className="flex flex-col gap-2 text-sm">
            <h3 className="text-lg font-semibold mb-1">Contact Ghana</h3>

            <p>Address: Airport Area, Accra, Ghana</p>
            <p>Phone 1: +233 55 000 1111</p>
            <p>Phone 2: +233 24 000 2222</p>
            <p>Email: info@example-aviation.com</p>

            {/* Button to open the reusable contact form */}
            <button
              className="mt-2 px-4 py-2 bg-[var(--color-background)] text-[var(--color-primary)] rounded hover:bg-gray-100 transition"
              onClick={() => setIsFormOpen(true)}
            >
              Inquire
            </button>
          </div>

          {/* RIGHT: GOOGLE MAP */}
          <div className="w-full h-56 sm:h-64 lg:h-72 overflow-hidden rounded-md">
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

      {/* Reusable Contact Form Modal */}
      <ReusableContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
