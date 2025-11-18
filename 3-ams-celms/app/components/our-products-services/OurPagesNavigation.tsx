// // File: app/components/our-products-services/OurPagesNavigation.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname, useRouter } from "next/navigation";

// interface Page {
//   title: string;
//   slug: string;
//   description: string;
//   imageSrc: string;
// }

// interface OurPagesNavigationProps {
//   initialSlug?: string;
// }

// const pages: Page[] = [
//   {
//     title: "Our Product",
//     slug: "our-product",
//     description:
//       "Explore our wide range of aviation products, including aircraft weighing sets, anti-icing duct testers, boroscope control units, cabin pressure test units, compass correction systems, digital pitot-static test sets, fuel test sets, and light aircraft weighing sets.",
//     imageSrc: "/images/products/our-product.jpg",
//   },
//   {
//     title: "Our Services",
//     slug: "our-services",
//     description:
//       "We provide comprehensive aviation services including line maintenance, component and engine support, painting & surface restoration, aeroplane maintenance, and full MRO solutions, ensuring safety, efficiency, and compliance across all operations.",
//     imageSrc: "/images/services/our-services.jpg",
//   },
// ];

// export default function OurPagesNavigation({
//   initialSlug,
// }: OurPagesNavigationProps) {
//   const pathname = usePathname();
//   const router = useRouter();

//   // Determine initial index based on URL or provided slug
//   const initialIndex =
//     pages.findIndex((p) =>
//       initialSlug ? initialSlug === p.slug : pathname.includes(p.slug)
//     ) ?? 0;

//   const [selectedIndex, setSelectedIndex] = useState(initialIndex);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Sync selectedIndex with URL changes
//   useEffect(() => {
//     const index = pages.findIndex((p) => pathname.includes(p.slug));
//     if (index >= 0 && index !== selectedIndex) setSelectedIndex(index);
//   }, [pathname, selectedIndex]);

//   const handleSelect = (idx: number) => {
//     setSelectedIndex(idx);
//     router.push(`/our-products-services/${pages[idx].slug}`);
//     setMobileMenuOpen(false);
//   };

//   const selectedPage = pages[selectedIndex];

//   return (
//     <main className="w-full bg-[var(--color-background)] text-[var(--color-primary)] py-16">
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-2">
//           {selectedPage.title}
//         </h1>
//         <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)] mx-auto"></div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
//         {/* Left menu */}
//         <nav className="hidden lg:block lg:w-1/4 bg-[var(--color-surface)] rounded-lg shadow-md p-4">
//           <ul className="space-y-2">
//             {pages.map((page, idx) => (
//               <li
//                 key={page.slug}
//                 onClick={() => handleSelect(idx)}
//                 className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
//                   selectedIndex === idx
//                     ? "bg-[var(--color-primary)] text-white font-semibold"
//                     : "hover:bg-[var(--color-primary)]/10"
//                 }`}
//               >
//                 {page.title}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Mobile dropdown */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="w-full bg-[var(--color-surface)] p-3 rounded-md flex justify-between items-center shadow-md"
//           >
//             <span className="font-semibold">{selectedPage.title}</span>
//             <span>{mobileMenuOpen ? "▲" : "▼"}</span>
//           </button>
//           {mobileMenuOpen && (
//             <ul className="mt-2 bg-[var(--color-surface)] rounded-md shadow-md overflow-hidden">
//               {pages.map((page, idx) => (
//                 <li
//                   key={page.slug}
//                   onClick={() => handleSelect(idx)}
//                   className={`cursor-pointer px-3 py-2 border-b last:border-b-0 transition-colors ${
//                     selectedIndex === idx
//                       ? "bg-[var(--color-primary)] text-white font-semibold"
//                       : "hover:bg-[var(--color-primary)]/10"
//                   }`}
//                 >
//                   {page.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Right panel */}
//         <section className="flex-1">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedPage.slug}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.6 }}
//               className="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden"
//             >
//               <div className="relative w-full h-64 sm:h-80 lg:h-96">
//                 <Image
//                   src={selectedPage.imageSrc}
//                   alt={selectedPage.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">
//                   {selectedPage.title}
//                 </h2>
//                 <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
//                   {selectedPage.description}
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </section>
//       </div>
//     </main>
//   );
// }
