"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="clay-logo w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              MovieSwift
            </span>
          </motion.div>
        </Link>

        <nav>
          <motion.ul
            className="flex space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <li>
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isHomePage
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Home
              </Link>
              {isHomePage && (
                <motion.div
                  className="h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-1"
                  layoutId="navbar-indicator"
                />
              )}
            </li>
            <li>
              <Link
                href="#"
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Theaters
              </Link>
            </li>
          </motion.ul>
        </nav>
      </div>
    </header>
  );
}
