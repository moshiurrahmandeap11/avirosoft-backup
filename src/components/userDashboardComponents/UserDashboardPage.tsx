"use client";

import React, { useEffect, useState } from "react";
import apiClient from "../shared/Axios/AxiosInstance";

const UserDashboardPage = () => {
  const [user, setUser] = useState(null);
  console.log("user data from dashboard :", user);

  useEffect(() => {
    const tryFetch = async () => {
      const res = await apiClient.get("/auth/me");
      setUser(res.data.data);
    };
    tryFetch();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No User Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No user data available.
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
