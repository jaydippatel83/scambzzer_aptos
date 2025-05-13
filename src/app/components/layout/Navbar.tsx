"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuthModal from "../auth/AuthModal";
import { fetchCurrentUser, UserData, logout } from "../../../lib/auth";

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((user: any) => setUser(user.data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-mono text-foreground dark:text-green-300 cursor-pointer hover:opacity-80 hover:text-white-300 transition"
          >
            <Image
              src="/assets/logo.png"
              alt="scambuzzer"
              width={180}
              height={38}
              className="w-full h-full"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#statistics" className="text-gray-600 hover:text-gray-900">
              Statistics
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a
              href="mailto:contact@scambuzzer.com"
              className="text-gray-600 hover:text-gray-900"
            >
              Contact Us
            </a>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                      {user?.avtar ? (
                        <img
                          src={user.avtar}
                          alt={user.name as string}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <span>{user?.name ? getInitials(user.name) : "U"}</span>
                      )}
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      </div>
    </header>
  );
};

export default Navbar;
