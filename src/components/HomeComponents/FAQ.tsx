"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Sample question #1",
    answer:
      "This is a sample answer for the first question. It provides helpful information to the user about our software solutions and services.",
  },
  {
    question: "Sample question #1",
    answer:
      "This is a sample answer for the second question. Our platform is designed to be user-friendly and efficient for businesses of all sizes.",
  },
  {
    question: "Sample question #1",
    answer:
      "This is a sample answer for the third question. We offer comprehensive support and regular updates to ensure the best experience.",
  },
  {
    question: "Sample question #1",
    answer:
      "This is a sample answer for the fourth question. Security and privacy are our top priorities when developing software solutions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-slate-50 dark:bg-gray-900 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-medium">
            Some Questions that our customers asks a lot. Here some selected.
          </p>
        </div>

        {/* FAQ Box with Shadow */}
        <div className="relative group mb-10">
          {/* Shadow Layer */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-gray-800 border border-slate-800 dark:border-gray-600 translate-x-2 translate-y-2" />

          {/* Main Box */}
          <div className="relative bg-white dark:bg-gray-900 border-2 border-slate-800 dark:border-gray-600 p-6 lg:p-10">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${
                  index !== faqs.length - 1 ? "border-b border-slate-200 dark:border-gray-700" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-5 lg:py-6 text-left"
                >
                  <span className="text-base lg:text-lg font-semibold text-slate-900 dark:text-gray-100">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4 w-10 h-10 border border-slate-800 dark:border-gray-600 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-blue-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm lg:text-base text-slate-600 dark:text-gray-400 pb-5 lg:pb-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Help Button */}
        <div className="flex justify-center">
          <motion.button
            className="relative px-10 py-2.5 bg-white dark:bg-gray-900 border-2 border-slate-800 dark:border-gray-600 text-sm font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Help
            {/* Bottom color bar */}
            <span className="absolute -bottom-2 left-2 right-2 h-2 bg-blue-500" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
