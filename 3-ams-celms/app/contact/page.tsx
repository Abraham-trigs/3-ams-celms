// File: app/contact/page.tsx
// Purpose: Full-page contact page with company details, contact form styled with background card, custom input color, and embedded Google map

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{7,15}$/.test(val), "Invalid phone number"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form submitted:", data);
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to submit form. Try again later.");
    }
  };

  return (
    <main className="bg-[var(--color-background)] py-12 px-4 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Contact info + form */}
        <div className="flex flex-col gap-6">
          <div className="relative w-32 h-32">
            <Image
              src="/logo.png"
              alt="3AMS-CELMS Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">
            Contact 3AMS-CELMS
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base lg:text-lg leading-relaxed">
            Address: Kotoka International Airport, Accra, Ghana
            <br />
            Phone: +233 30 123 4567
            <br />
            Email: contact@3ams-celms.com
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6 bg-[var(--color-background)] p-6 rounded-xl shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="border border-[var(--color-primary)] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[#8c929c] text-[var(--color-background)] placeholder-[var(--color-text-secondary)]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="border border-[var(--color-primary)] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[#76869e] text-[var(--color-background)] placeholder-[var(--color-text-secondary)]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            <input
              type="text"
              placeholder="Phone (optional)"
              {...register("phone")}
              className="border border-[var(--color-primary)] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[#76869e] text-[var(--color-background)] placeholder-[var(--color-text-secondary)]"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}

            <input
              type="text"
              placeholder="Subject"
              {...register("subject")}
              className="border border-[var(--color-primary)] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[#76869e] text-[var(--color-background)] placeholder-[var(--color-text-secondary)]"
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">
                {errors.subject.message}
              </span>
            )}

            <textarea
              placeholder="Message"
              {...register("message")}
              rows={6}
              className="border border-[var(--color-primary)] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[#76869e] text-[var(--color-background)] placeholder-[var(--color-text-secondary)] resize-none"
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-primary)] text-[var(--color-background)] py-3 rounded mt-2 disabled:opacity-50 hover:opacity-90 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitted && (
              <p className="text-green-500 font-medium mt-2">
                Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </div>

        {/* Right: Google Map */}
        <div className="w-full h-96 lg:h-[600px] rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7727649217!2d-0.10502359999996974!3d5.600551600000011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf85ad10f34f7d%3A0xf7077b28504ce1f0!2sFord%20School!5e0!3m2!1sen!2sgh!4v1763344235681!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

/*
Design reasoning:
- Card uses background color for contrast; inputs now have custom color (#76869e) to stand out.
- Placeholder text remains secondary color for readability; actual input text uses background color for clarity.
- Maintains clean two-column responsive layout.

Structure:
- Left: Logo, heading, company info, and contact form
- Right: Embedded Google Map

Implementation guidance:
- Inputs keep focus ring for accessibility; button uses primary color for visual hierarchy.
- Color choices ensure form elements are distinguishable against page background.

Scalability insight:
- Supports adding multiple input themes or custom color schemes for branding.
*/
