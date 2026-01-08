'use client';

import { motion } from 'framer-motion';

export default function HeroSection({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            {title || "Creative Designer"}
            </h1>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10">
            {subtitle || "Designing experiences that matter."}
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center space-x-4"
        >
            <a href="#portfolio" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
            View Work
            </a>
            <a href="#contact" className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition">
            Contact Me
            </a>
        </motion.div>
      </div>
    </section>
  );
}
