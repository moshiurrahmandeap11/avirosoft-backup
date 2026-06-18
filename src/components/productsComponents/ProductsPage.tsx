"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../../data/products";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Products
        </h1>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
            >
              {/* Logo */}
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={product.logo}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Name */}
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {product.name}
              </span>

              {/* Short Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                {product.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
