import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>
          <div className="h-5 w-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;