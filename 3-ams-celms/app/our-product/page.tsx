"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReusableContactForm from "@/app/components/home/ReusableContactForm";

interface Product {
  name: string;
  imageSrc: string;
}

const products: Product[] = [
  { name: "Aircraft Weighing Set", imageSrc: "/aircraft-weighing-set.png" },
  {
    name: "Anti-Icing Duct Tester Leak",
    imageSrc: "/anti-icing-duct-tester.png",
  },
  { name: "Borescope Control Unit", imageSrc: "/borescope-control-unit.png" },
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

export default function OurProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-primary)] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Products</h1>
          <div className="h-[3px] w-32 mx-auto bg-[var(--color-primary)]"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="w-full h-40 relative mb-4">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 80vw, 20vw"
                />
              </div>
              <p className="text-sm sm:text-base font-semibold text-[var(--color-text-secondary)]">
                {product.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent image modal
                  setIsFormOpen(true);
                }}
                className="mt-3 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-dark)] transition"
              >
                Inquire
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal / Lightbox */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl h-96 sm:h-[500px] bg-white dark:bg-gray-900 rounded-lg p-4 flex flex-col items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-64 sm:h-80 mb-4">
                <Image
                  src={selectedProduct.imageSrc}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded hover:bg-[var(--color-primary-dark)] transition"
              >
                Inquire
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reusable Contact Form Modal */}
      <ReusableContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </main>
  );
}
