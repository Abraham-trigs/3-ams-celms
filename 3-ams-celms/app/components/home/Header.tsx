// File: app/components/home/Header.tsx
// Purpose: Main site navigation for 3-AMS-CELMS with dropdown for "Our products & services" and Framer Motion animation

"use client";

import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#" },
  { label: "Our areas", href: "#" },
  {
    label: "Our products & services",
    href: "#",
    dropdown: [
      { label: "Service A", href: "#" },
      { label: "Service B", href: "#" },
      { label: "Service C", href: "#" },
    ],
  },
  { label: "Gallery", href: "#" },
  { label: "Contact", href: "#" },
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
                            <a
                              href={sub.href}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <a
                  href={item.href}
                  className="relative pb-1 hover:after:absolute hover:after:left-0 hover:after:bottom-0.5 hover:after:h-[2px] hover:after:w-full hover:after:bg-[var(--color-secondary)] hover:after:content-[''] transition-all"
                >
                  {item.label}
                </a>
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
Design reasoning
- Dropdown uses Framer Motion for smooth fade + slide animation on open/close.
- AnimatePresence ensures proper exit animation when dropdown closes.
- Improves visual experience while keeping hover underline intact.

Structure
- Center: Menu items with optional dropdown using motion.ul
- Right: Social icons remain unchanged

Implementation guidance
- Install framer-motion via `npm i framer-motion` if not present.
- Dropdown items remain focusable and hoverable; Tailwind handles styling.
- Can add multi-level dropdowns with nested motion.ul similarly.

Scalability insight
- Framer Motion enables reusable animation for future dropdowns or modals.
- Animation duration and easing easily adjustable for consistent UX.
*/
