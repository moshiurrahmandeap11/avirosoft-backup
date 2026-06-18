"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getProductBySlug } from "../../data/products";

interface ProductDetailPageProps {
  slug: string;
}

const ProductDetailPage = ({ slug }: ProductDetailPageProps) => {
  const product = getProductBySlug(slug);

  const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.aviro24.shop";

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Products
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <div className="w-20 h-20">
            <Image
              src={product.logo}
              alt={product.name}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          {/* Full Description */}
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Access Button */}
          <a
            href={`${ACCOUNTS_URL}?product=${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-2"
          >
            Access {product.name}
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.features.map((feature, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
          Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
