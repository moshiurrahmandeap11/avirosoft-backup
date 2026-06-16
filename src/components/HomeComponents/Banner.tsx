"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const topProducts = [
  {
    icon: "/Aviro Pulse.svg",
    title: "Aviro Pulse",
    description:
      "AviroSoft's Powerful employee attendance and time tracking software for small to medium businesses.",
    badge: "New Update: Integrated with AI",
  },
  {
    icon: "/Aviro HR.svg",
    title: "Aviro HR",
    description:
      "Streamline all your HR processes and deliver exceptional employee experiences. Make your business's HR process completely automated and organized.",
  },
];

const bottomProduct = {
  icon: "/Aviro Flow.svg",
  title: "Aviro Flow",
  description:
    "Our most powerful Payroll and Accounting system compliant with country specific rules.",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

function ProductCard({
  product,
}: {
  product: (typeof topProducts)[0];
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group"
    >
      {/* Shadow Layer */}
      <div className="absolute inset-0 bg-slate-100 dark:bg-gray-800 border border-slate-800 dark:border-gray-600 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5" />

      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-900 border-2 border-slate-800 dark:border-gray-600 p-6 lg:p-7 h-full flex flex-col">
        {/* Icon */}
        <div className="w-15 h-15 flex items-center justify-center mb-4">
          <Image
            src={product.icon}
            alt={product.title}
            width={150}
            height={150}
            className="w-15 h-15"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4 grow">
          {product.description}
        </p>

        {/* Badge */}
        {product.badge && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-slate-100 dark:bg-gray-800">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-slate-700 dark:text-gray-300">
              {product.badge}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <motion.button
            className="px-4 py-2 border cursor-pointer border-slate-800 dark:border-gray-600 text-sm font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
          <motion.button
            className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a quote
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Banner() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Text */}
        <motion.div
          className="text-center mb-14 lg:mb-18"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 leading-tight mb-2"
            variants={itemVariants}
          >
            Easy yet Powerful Software Solutions
          </motion.h1>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 leading-tight mb-6"
            variants={itemVariants}
          >
            for your{" "}
            <span className="relative inline-block">
              Business
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            A unique and powerful software suite to transform the way you work.
            Designed for businesses of all sizes, built by a company that values
            your privacy.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex rounded-full cursor-pointer items-center gap-2 px-7 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          className="max-w-5xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>

          {/* Bottom Row - 1 Card (Full Width) */}
          <div className="max-w-2xl mx-auto md:mx-0 md:max-w-none">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Shadow Layer */}
              <div className="absolute inset-0 bg-slate-100 dark:bg-gray-800 border border-slate-800 dark:border-gray-600 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5" />

              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-900 border-2 border-slate-800 dark:border-gray-600 p-6 lg:p-7 flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={bottomProduct.icon}
                    alt={bottomProduct.title}
                    width={48}
                    height={48}
                    className="w-15 h-15"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">
                    {bottomProduct.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {bottomProduct.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="px-4 py-2 border cursor-pointer border-slate-800 dark:border-gray-600 text-sm font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get a quote
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
