"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { getProductBySlug } from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../components/shared/Axios/AxiosInstance";

interface ProductDetailPageProps {
  slug: string;
}

interface Plan {
  id: string;
  name: string;
  // add other fields if needed
}

interface SubscriptionPayload {
  planId: string;
  status: "ACTIVE";
  expiresAt: string;
}

const ProductDetailPage = ({ slug }: ProductDetailPageProps) => {
  const router = useRouter();
  const product = getProductBySlug(slug);
  const { user, isLoading } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const ACCOUNTS_URL =
    process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.aviro24.shop";

  // Product subdomain: "Aviro Pulse" → "pulse.aviro24.shop"
  const getProductUrl = () => {
    if (!product) return "https://aviro24.shop";
    const firstWord = product.name.split(" ")[1]?.toLowerCase() || "";
    return `https://${firstWord}.aviro24.shop`;
  };

  const firstWord = product?.name.split(" ")[1]?.toLowerCase() || "";
  const homeUrl = "https://home.aviro24.shop";
  const productUrl = `https://${firstWord}.aviro24.shop`;

  // Check if user already has a subscription for this specific service
  const hasExistingSubscription = useCallback(() => {
    if (!user) return false;

    const subscriptions = (user as Record<string, unknown>).subscriptions as
      | Array<Record<string, unknown>>
      | undefined;

    if (!Array.isArray(subscriptions)) return false;

    return subscriptions.some((sub) => {
      const services = sub.services as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(services)) return false;
      return services.some((service) => service.id === product?.id);
    });
  }, [user, product]);

  const handleAccess = async () => {
    if (!user || !product) return;

    // If already subscribed, go to home.aviro24.shop
    if (hasExistingSubscription()) {
      router.push(homeUrl);
      return;
    }

    setSubmitting(true);

    try {
      // 1. Fetch plans - API returns { success, message, data: [...] }
      const plansRes = await apiClient.get<{ data: Plan[] }>("/plans");
      const plans = plansRes.data.data;

      // 2. Use first plan directly
      const plan = plans[0];

      if (!plan) {
        throw new Error("No plan found");
      }

      // 3. Build payload and hit /subscriptions
      const payload: SubscriptionPayload = {
        planId: plan.id,
        status: "ACTIVE",
        expiresAt: "2025-12-31T23:59:59Z",
      };

      const res = await apiClient.post("/subscriptions", payload);
      console.log("res from product details : ", res);

      // 4. Navigate to product subdomain
      router.push(productUrl);
    } catch (error) {
      console.error("Subscription error:", error);
      // Even on error, try navigating to product page so user isn't stuck
      router.push("home.aviro24.shop");
    } finally {
      setSubmitting(false);
    }
  };

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
          {!isLoading && (
            <>
              {user ? (
                <button
                  onClick={handleAccess}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Access {product.name}</>
                  )}
                </button>
              ) : (
                <a
                  href={ACCOUNTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors mt-2"
                >
                  Sign Up for Free Trial
                </a>
              )}
            </>
          )}
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
