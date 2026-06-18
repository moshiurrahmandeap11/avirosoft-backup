"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

const UserDashboardPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to view your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          User Dashboard
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Raw User Data
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
