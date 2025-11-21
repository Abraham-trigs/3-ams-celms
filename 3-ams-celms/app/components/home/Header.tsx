"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Our areas", href: "/our-areas" },
  {
    label: "Our products & services",
    href: "#",
    dropdown: [
      { label: "Our Product", href: "/our-product" },
      { label: "Our Services", href: "/our-services" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  const closeDropdown = () => setOpenDropdown(null);

  // Close dropdown on route change
  useEffect(() => {
    closeDropdown();
  }, [pathname]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = (href: string) =>
    `relative pb-1 transition-all ${
      pathname === href
        ? "after:absolute after:left-0 after:bottom-0.5 after:h-[2px] after:w-full after:bg-[var(--color-secondary)] after:content-['']"
        : "hover:after:absolute hover:after:left-0 hover:after:bottom-0.5 hover:after:h-[2px] hover:after:w-full hover:after:bg-[var(--color-secondary)] hover:after:content-['']"
    }`;

  return (
    <header
      className="w-full bg-[var(--color-primary)] text-white relative z-50"
      ref={headerRef}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between relative">
        {/* Navigation */}
        <nav className="flex space-x-8 font-medium relative">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center space-x-1 relative pb-1"
                  >
                    <span>{item.label}</span>
                    <FaChevronDown size={12} />
                  </button>

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
                              className={`block px-4 py-2 rounded transition-colors ${
                                pathname === sub.href
                                  ? "bg-[var(--color-primary)] text-white font-semibold"
                                  : "hover:bg-[var(--color-primary)] hover:text-white"
                              }`}
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
                <Link href={item.href} className={linkClasses(item.href)}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Social Icons */}
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
