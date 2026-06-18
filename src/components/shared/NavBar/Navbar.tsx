// components/navbar/Navbar.tsx
"use client";

import { navItems } from "@/data/navItems";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import AviroLogo from "../../../../public/Avirosoft Logo.svg";
import Image from "next/image";
import {
  useAuth,
  getUserName,
  getUserAvatar,
} from "../../../context/AuthContext";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import apiClient from "../Axios/AxiosInstance";

const Navbar = () => {
  const { user, logout } = useAuth();
  const userName = getUserName(user);
  const userAvatar = getUserAvatar(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = !!user;
  const { setTheme, resolvedTheme } = useTheme();

  // Environment URLs - build time e resolve hoy
  const ACCOUNTS_URL =
    process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.aviro24.shop";
  const ACCOUNTS_URL_2 = process.env.NEXT_PUBLIC_ACCOUNTS_URL_2;
  const ACCOUNTS_URL_3 = process.env.NEXT_PUBLIC_ACCOUNTS_URL_3 || "https://accounts.aviro24.shop/profile";
  const HOME_URL =
    process.env.NEXT_PUBLIC_HOME_URL || "https://home.aviro24.shop";

    const handleLogOut = async () => {
      const res = await apiClient.post("/auth/logout")
      console.log("log out response :", res);
    }

  useEffect(() => {
    const tryCall = async () => {
      await setMounted(true);
    };
    tryCall();
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Desktop Nav Items */}
          <div className="flex items-center gap-2 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src={AviroLogo}
                width={32}
                height={32}
                alt="AviroSoft"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                AviroSoft
              </h1>
            </Link>

            {/* Desktop Navigation Items (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.path}
                  prefetch={false}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Auth Buttons / User Profile / Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {!isLoggedIn ? (
              // Desktop Auth Buttons (hidden on mobile when menu is open)
              <div className="hidden sm:flex items-center gap-3">
                <a href={ACCOUNTS_URL} className="btn btn-outline">
                  Sign In
                </a>
                <a href={ACCOUNTS_URL_2} className="btn btn-primary">
                  Sign Up
                </a>
              </div>
            ) : (
              // User Profile Dropdown (Desktop)
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu - Zoho Style */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                    {/* User Info Header */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-semibold text-lg overflow-hidden shrink-0">
                        {userAvatar ? (
                          <Image
                            src={userAvatar}
                            alt={userName}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        ) : (
                          <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {userName}
                        </p>
                        <a
                          href={HOME_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 dark:text-gray-400 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Access Aviro Home
                        </a>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700" />

                    {/* Actions Row */}
                    <div className="flex items-center">
                      <a
                        href={ACCOUNTS_URL_3}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Account
                      </a>
                      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsDropdownOpen(false);
                        }}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-center"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
          <div className="p-4">
            {/* Navigation Items */}
            <div className="space-y-1">
              {navItems.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.path}
                  prefetch={false}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.name}
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mounted && resolvedTheme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Auth Buttons (when not logged in) */}
            {!isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <a
                  href={ACCOUNTS_URL}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn btn-outline"
                >
                  Sign In
                </a>
                <a
                  href={ACCOUNTS_URL_2}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn btn-primary"
                >
                  Sign Up
                </a>
              </div>
            )}

            {/* Mobile User Actions (when logged in) */}
            {isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Mobile User Info Header */}
                <div className="flex items-center gap-3 px-3 py-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-semibold overflow-hidden shrink-0">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {userName}
                    </p>
                    <a
                      href={HOME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 dark:text-gray-400 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Access Aviro Home
                    </a>
                  </div>
                </div>

                <div className="flex items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                  <a
                    href={ACCOUNTS_URL_3}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </a>
                  <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 px-3 py-2 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-center"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
