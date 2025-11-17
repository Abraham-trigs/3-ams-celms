// File: app/components/home/Header.tsx
// Purpose: Main site navigation for 3-AMS-CELMS with dropdown using Next.js Link for internal navigation and Framer Motion animation

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/#about" },
  { label: "Our areas", href: "/#areas" },
  {
    label: "Our products & services",
    href: "#",
    dropdown: [
      { label: "Service A", href: "/services/service-a" },
      { label: "Service B", href: "/services/service-b" },
      { label: "Service C", href: "/services/service-c" },
    ],
  },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="w-full bg-[var(--color-primary)] text-white relative z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between relative">
        {/* Center: Navigation */}
        <nav className="flex space-x-8 font-medium relative">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center space-x-1 relative pb-1 hover:after:absolute hover:after:left-0 hover:after:bottom-0.5 hover:after:h-[2px] hover:after:w-full hover:after:bg-[var(--color-secondary)] hover:after:content-[''] transition-all"
                  >
                    <span>{item.label}</span>
                    <FaChevronDown size={12} />
                  </button>

                  {/* Dropdown with Framer Motion */}
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48 py-2 z-50"
                      >
                        {item.dropdown.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="relative pb-1 hover:after:absolute hover:after:left-0 hover:after:bottom-0.5 hover:after:h-[2px] hover:after:w-full hover:after:bg-[var(--color-secondary)] hover:after:content-[''] transition-all"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Social icons */}
        <div className="flex space-x-4 text-white">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}

/*
Design reasoning:
- Internal links now use Next.js Link for client-side navigation, preventing full page reload.
- Dropdown items also use Link for internal pages.
- External social links remain <a> tags for proper behavior.

Structure:
- Center: Navigation menu with optional dropdowns using motion.ul
- Right: Social media icons

Implementation guidance:
- Adjust hrefs to match actual internal routes.
- Framer Motion handles smooth dropdown animations; Link preserves SPA behavior.

Scalability insight:
- Easily extendable with nested dropdowns or multi-level menus using the same pattern.
- Client-side routing ensures consistent UX for all internal pages.
*/
