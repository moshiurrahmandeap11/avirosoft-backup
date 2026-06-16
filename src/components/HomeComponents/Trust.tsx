"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { src: "/MintHost.svg", alt: "MintHost" },
  { src: "/VaraNiben.svg", alt: "VaraNiben" },
  { src: "/MintHost.svg", alt: "MintHost" },
];

export default function Trust() {
  return (
    <section className="w-full bg-white dark:bg-gray-900 border-y border-slate-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
          {/* Left Content */}
          <div className="flex-shrink-0">
            <div className="flex items-start gap-4">
              {/* Left Border Line */}
              <div className="w-1 h-16 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
              
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">
                  Company&apos;s trust us
                </h2>
                <p className="text-sm text-slate-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Various international company&apos;s operating their business using our software.
                </p>
              </div>
            </div>
          </div>

          {/* Right Logos */}
          <div className="flex items-center gap-8 lg:gap-12 flex-wrap">
            {logos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={50}
                  className="w-auto h-10 lg:h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
