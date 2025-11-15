// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// interface HeroOverlayProps {
//   headline: string; // Main headline text
//   subtext: string; // Subtext/description
//   ctaText?: string; // Optional call-to-action button text
// }

// export default functiona HeroOverlay({
//   headline,
//   subtext,
//   ctaText,
// }: HeroOverlayProps) {
//   return (
//     // Full overlay over video with semi-transparent background
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
//       {/* Animated headline */}
//       <motion.h1
//         initial={{ y: -20, opacity: 0 }} // Start slightly above, invisible
//         animate={{ y: 0, opacity: 1 }} // Slide down into view
//         transition={{ duration: 0.8 }} // Animation duration
//         className="text-3xl md:text-5xl font-bold text-white"
//       >
//         {headline}
//       </motion.h1>

//       {/* Animated subtext */}
//       <motion.p
//         initial={{ y: 20, opacity: 0 }} // Start slightly below, invisible
//         animate={{ y: 0, opacity: 1 }} // Slide up into view
//         transition={{ duration: 0.8, delay: 0.3 }} // Slight delay after headline
//         className="mt-4 text-lg md:text-xl text-white max-w-3xl"
//       >
//         {subtext}
//       </motion.p>

//       {/* Optional animated CTA button */}
//       {ctaText && (
//         <motion.button
//           initial={{ scale: 0.9, opacity: 0 }} // Slightly smaller, invisible
//           animate={{ scale: 1, opacity: 1 }} // Scale up and fade in
//           transition={{ duration: 0.5, delay: 0.6 }} // Delay after text
//           className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]"
//         >
//           {ctaText}
//         </motion.button>
//       )}
//     </div>
//   );
// }

// /*
// Design reasoning:
// - Separates overlay from video for clean structure and reusability.
// - Semi-transparent black ensures text readability over any video.
// - Framer Motion animations provide smooth, engaging entrance effects.

// Structure:
// - Parent <div> fills video container and centers content.
// - <motion.h1> for headline animation.
// - <motion.p> for subtext animation with slight delay.
// - Optional <motion.button> for CTA, animated with scale and opacity.

// Implementation guidance:
// - Import inside HeroVideoContainer and pass current video’s text props.
// - Tailwind handles responsive text sizing and spacing.
// - Framer Motion handles staggered animations for a professional feel.

// Scalability insight:
// - Additional text blocks or buttons can be added easily.
// - Can be reused for image banners, modals, or any hero section with animated overlays.
// */
