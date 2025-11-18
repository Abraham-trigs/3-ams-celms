// File: app/components/home/ProductsSection.tsx
// Purpose: Display key product equipment in a responsive animated grid.

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Product type
interface Product {
  name: string;
  imageSrc: string;
}

// Product data
const products: Product[] = [
  {
    name: "Aircraft Weighing Set",
    imageSrc: "/aircraft-weighing-set.png",
  },
  {
    name: "Anti-Icing Duct Tester Leak",
    imageSrc: "/anti-icing-duct-tester.png",
  },
  {
    name: "Borescope Control Unit",
    imageSrc: "/borescope-control-unit.png",
  },
  {
    name: "Cabin Pressure Test Unit",
    imageSrc: "/cabin-pressure-test-unit.png",
  },
  {
    name: "Compass Correction System",
    imageSrc: "/compass-correction-system.png",
  },
  {
    name: "Digital Pitot Static Test Set",
    imageSrc: "/pitot-static-test-set.png",
  },
  { name: "Fuel Test Set", imageSrc: "/fuel-test-set.png" },
  {
    name: "Light Aircraft Weighing Set",
    imageSrc: "/light-aircraft-weighing-set.png",
  },
];

export default function ProductsSection() {
  return (
    <section className="w-full bg-[var(--color-background)] py-16 text-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Our Products</h2>
          <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Smaller Image Box */}
              <div className="w-full h-24 sm:h-28 relative mb-2">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40vw, 20vw"
                />
              </div>

              {/* Compact Label */}
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-tight">
                {product.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
